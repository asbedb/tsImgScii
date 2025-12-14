import { type ChangeEvent } from 'react'
import { DEFAULT_SHADE_RAMP } from '../const'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Details } from '../components/Details'

interface ShadeRampProps {
    shadeRamp: string | null
    handleShadeRampChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleGenerate: () => void
}
export function ShadeRamp({
    shadeRamp,
    handleShadeRampChange,
    handleGenerate,
}: ShadeRampProps) {
    return (
        <Details title="Shaderamp">
            <div className="flex w-full flex-col gap-4">
                <Input
                    type="text"
                    label="Shade Ramp:"
                    customPlaceholder={
                        shadeRamp
                            ? shadeRamp
                            : `${DEFAULT_SHADE_RAMP} (default)`
                    }
                    onChange={handleShadeRampChange}
                    isTextInput
                />
                <Button label="Apply Shaderamp" onClick={handleGenerate} />
            </div>
        </Details>
    )
}
