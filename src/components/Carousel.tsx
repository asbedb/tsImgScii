import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

interface CarouselProps {
    children: React.ReactNode
}

export function Carousel({ children }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!carouselRef.current || e.button !== 0) return
        setIsDragging(true)
        setStartX(e.pageX - carouselRef.current.offsetLeft)
        setScrollLeft(carouselRef.current.scrollLeft)
    }

    const handleMouseUpOrLeave = () => {
        // Stop drag and re-enable snapping
        setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !carouselRef.current) return
        const x = e.pageX - carouselRef.current.offsetLeft
        const walk = (x - startX) * 2
        carouselRef.current.scrollLeft = scrollLeft - walk
    }

    const baseClasses =
        ' flex h-full min-h-[50%] w-full overflow-hidden overflow-x-scroll text-center select-none'
    const snappingClass = isDragging ? '' : 'snap-x snap-mandatory'
    const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab'

    return (
        <div
            ref={carouselRef}
            className={`${baseClasses} ${snappingClass} ${cursorClass}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
    )
}
