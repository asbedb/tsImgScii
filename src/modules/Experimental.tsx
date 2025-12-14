import { type ChangeEvent } from 'react'
import { Input } from '../components/Input'
import { Details } from '../components/Details'

interface ExperimentalProps {
    handleGreyscale: (event: ChangeEvent<HTMLInputElement>) => void
    greyScale: boolean
}

export function Experimental({
    handleGreyscale,
    greyScale,
}: ExperimentalProps) {
    return (
        <Details title="Experimental Features">
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
