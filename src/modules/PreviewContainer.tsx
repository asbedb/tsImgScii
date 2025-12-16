import { AsciiContainer } from '../components/AsciiContainer'
import { ImageComponent } from '../components/ImageComponent'
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
        <div className="flex h-full min-h-[50%] w-full snap-x overflow-hidden overflow-x-scroll text-center">
            <div className="flex min-w-screen snap-center items-center justify-center">
                {originalUrl ? (
                    <ImageComponent label="Original:" sourceUrl={originalUrl} />
                ) : (
                    <div className="p-8">Upload an image to start</div>
                )}
            </div>
            <div className="flex min-w-screen snap-center items-center justify-center">
                {previewUrl ? (
                    <ImageComponent label="Modified:" sourceUrl={previewUrl} />
                ) : (
                    <div className="p-8">Modify the image to see a preview</div>
                )}
            </div>
            {/* Permanent Slot 3: ASCII Art (FIXED) */}
            <div className="flex min-w-screen snap-center items-center justify-center">
                {asciiArt ? (
                    <AsciiContainer content={asciiArt} />
                ) : (
                    <div className="p-8">
                        Generate ASCII art to view results
                    </div>
                )}
            </div>
        </div>
    )
}
