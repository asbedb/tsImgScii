import { useState, useEffect } from 'react'
import { getImageDimensions } from '../util/image-utils/getImageDimensions'

interface ImageComponentProps {
    sourceUrl: string
    label?: string
}

export function ImageComponent({ sourceUrl, label }: ImageComponentProps) {
    const [dimensions, setDimensions] = useState<{
        width: number | null
        height: number | null
    }>({
        width: null,
        height: null,
    })

    useEffect(() => {
        let isCancelled = false
        const fetchDimensions = async () => {
            setDimensions({ width: null, height: null })
            try {
                const dimensionsObject = await getImageDimensions(sourceUrl)
                if (!isCancelled) {
                    setDimensions({
                        width: dimensionsObject.width,
                        height: dimensionsObject.height,
                    })
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Failed to get image dimensions:', error)
                    setDimensions({ width: 0, height: 0 })
                }
            }
        }

        if (sourceUrl) {
            fetchDimensions()
        }
        return () => {
            isCancelled = true
        }
    }, [sourceUrl])
    const displayWidth = dimensions.width ?? '...'
    const displayHeight = dimensions.height ?? '...'

    return (
        <a
            className="flex flex-col items-center gap-2 p-2 select-none hover:cursor-pointer"
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span>{label}</span>
            <img
                src={sourceUrl}
                alt={`${label} Preview`}
                className="flex max-w-[100px] min-w-[50px]"
            />
            <span>
                Width: {displayWidth} Height: {displayHeight}
            </span>
        </a>
    )
}
