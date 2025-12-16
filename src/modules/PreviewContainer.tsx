import { AsciiContainer } from '../components/AsciiContainer'
import { CarouselItem } from '../components/CarouselItem'
import { ImageComponent } from '../components/ImageComponent'
import { Carousel } from '../components/Carousel'
interface ConsoleProps {
    originalUrl: string | null
    previewUrl: string | null
    asciiArt: React.ReactNode | null
}
export function PreviewContainer({
    originalUrl,
    previewUrl,
    asciiArt,
}: ConsoleProps) {
    return (
        <Carousel>
            <CarouselItem>
                {originalUrl ? (
                    <ImageComponent label="Original:" sourceUrl={originalUrl} />
                ) : (
                    <div className="p-8">Upload an image to start</div>
                )}
            </CarouselItem>
            <CarouselItem>
                {previewUrl ? (
                    <ImageComponent label="Modified:" sourceUrl={previewUrl} />
                ) : (
                    <div className="p-8">Modify the image to see a preview</div>
                )}
            </CarouselItem>
            <CarouselItem>
                {asciiArt ? (
                    <AsciiContainer content={asciiArt} />
                ) : (
                    <div className="p-8">
                        Generate ASCII art to view results
                    </div>
                )}
            </CarouselItem>
        </Carousel>
    )
}
