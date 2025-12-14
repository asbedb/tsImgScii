import { Details } from '../components/Details'
import { ImageComponent } from '../components/ImageComponent'
import { Input } from '../components/Input'
import { type ChangeEvent } from 'react'

interface ImageSelectProps {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
    originalUrl: string | null
    previewUrl: string | null
}

export function ImageSelect({
    handleFileChange,
    originalUrl,
    previewUrl,
}: ImageSelectProps) {
    return (
        <Details title="Select your Image">
            <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col justify-center gap-2 md:flex-row">
                    {originalUrl ? (
                        <ImageComponent
                            label="Original:"
                            sourceUrl={originalUrl}
                        />
                    ) : (
                        ''
                    )}
                    {previewUrl ? (
                        <ImageComponent
                            label="Modified:"
                            sourceUrl={previewUrl}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    label="Select Image:"
                    responsive
                />
            </div>
        </Details>
    )
}
