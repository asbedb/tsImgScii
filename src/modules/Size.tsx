import { type ChangeEvent } from 'react'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Details } from '../components/Details'

interface SizeProps {
    handleWidthChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleHeightChange: (event: ChangeEvent<HTMLInputElement>) => void
    applyResize: () => void
    width: number | null
    height: number | null
}
export function Size({
    handleWidthChange,
    handleHeightChange,
    applyResize,
    width,
    height,
}: SizeProps) {
    return (
        <Details title="Resize">
            <div className="flex w-full flex-col gap-4 border border-white/10 p-2">
                <Input
                    type="number"
                    onChange={handleWidthChange}
                    value={width ? width : ''}
                    label="Width"
                    isTextInput
                />
                <Input
                    type="number"
                    onChange={handleHeightChange}
                    label="Height"
                    value={height ? height : ''}
                    isTextInput
                />
                <Button label="Apply Resize" onClick={applyResize} />
            </div>
        </Details>
    )
}
