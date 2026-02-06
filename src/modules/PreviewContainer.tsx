import { AsciiContainer } from '../components/AsciiContainer'
import { CarouselItem } from '../components/CarouselItem'
import { ImageComponent } from '../components/ImageComponent'
import { Carousel } from '../components/Carousel'

interface ConsoleProps {
    originalUrl: string | null
    previewUrl: string | null
    asciiArt: string | null
    width: number | null
    height: number | null
}

export function PreviewContainer({
    originalUrl,
    previewUrl,
    asciiArt,
    width,
    height,
}: ConsoleProps) {
    const items = [
        {
            id: 'orig',
            label: 'Original',
            content: (
                <CarouselItem>
                    {originalUrl ? (
                        <ImageComponent
                            label="Original:"
                            sourceUrl={originalUrl}
                        />
                    ) : (
                        <div className="p-8">Upload an image to start</div>
                    )}
                </CarouselItem>
            ),
        },
        {
            id: 'mod',
            label: 'Modified',
            content: (
                <CarouselItem>
                    {previewUrl ? (
                        <ImageComponent
                            label="Modified:"
                            sourceUrl={previewUrl}
                        />
                    ) : (
                        <div className="p-8 text-gray-400">
                            Modify the image to see a preview
                        </div>
                    )}
                </CarouselItem>
            ),
        },
        {
            id: 'ascii',
            label: 'ASCII',
            content: (
                <CarouselItem>
                    {asciiArt ? (
                        <AsciiContainer
                            content={asciiArt}
                            cols={width}
                            rows={height}
                        />
                    ) : (
                        <div className="p-8 text-gray-400">
                            Generate ASCII art to view results
                        </div>
                    )}
                </CarouselItem>
            ),
        },
    ]

    return <Carousel items={items} />
}
