import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

interface CarouselItem {
    id: string
    label: string
    content: React.ReactNode
}
interface CarouselProps {
    items: CarouselItem[]
}

export function Carousel({ items }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const scrollToIndex = (index: number) => {
        const container = carouselRef.current
        if (!container) return
        const target = container.children[index] as HTMLElement
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            })
            setActiveIndex(index)
        }
    }
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!carouselRef.current || e.button !== 0) return
        setIsDragging(true)
        setStartX(e.pageX - carouselRef.current.offsetLeft)
        setScrollLeft(carouselRef.current.scrollLeft)
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !carouselRef.current) return
        const index = Math.round(
            carouselRef.current.scrollLeft / carouselRef.current.clientWidth
        )
        const x = e.pageX - carouselRef.current.offsetLeft
        const walk = (x - startX) * 2
        carouselRef.current.scrollLeft = scrollLeft - walk
        if (index !== activeIndex) {
            setActiveIndex(index)
        }
    }

    const baseClasses =
        ' flex h-full max-h-[70vh]  overflow-x-scroll text-center select-none items-center overflow-y-hidden'
    const snappingClass = isDragging ? '' : 'snap-x snap-mandatory'
    const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab'

    return (
        <div className="flex flex-col">
            <nav className="flex justify-center gap-2">
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToIndex(index)}
                        className={`rounded-full px-4 py-2 transition-all ${
                            activeIndex === index
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div
                ref={carouselRef}
                className={`${baseClasses} ${snappingClass} ${cursorClass}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onMouseMove={handleMouseMove}
            >
                {items.map((item) => (
                    <div key={item.id}>{item.content}</div>
                ))}
            </div>
        </div>
    )
}
