import { type ChangeEvent } from 'react'
import { Input } from '../components/Input'
import { Details } from '../components/Details'

interface FilterProps {
    handleGreyscale: (event: ChangeEvent<HTMLInputElement>) => void
    greyScale: boolean
}

export function Filters({ handleGreyscale, greyScale }: FilterProps) {
    return (
        <Details title="Filters">
            <div className="flex w-full flex-col">
                <Input
                    type="checkbox"
                    label="Toggle Greyscale:"
                    onChange={handleGreyscale}
                    isChecked={greyScale}
                />
            </div>
        </Details>
    )
}
