import { Details } from '../components/Details'
import { Input } from '../components/Input'
import { type ChangeEvent } from 'react'

interface ImageSelectProps {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function ImageSelect({ handleFileChange }: ImageSelectProps) {
    return (
        <Details title="Select your Image" isOpen={true}>
            <div className="flex w-full flex-col gap-4">
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
