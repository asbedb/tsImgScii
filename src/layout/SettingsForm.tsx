import { type ChangeEvent } from 'react'
import { ImageSelect } from '../modules/ImageSelect'
import { ShadeRamp } from '../modules/ShadeRamp'
import { Size } from '../modules/Size'
import { Filters } from '../modules/Filters'
import { MessageModule } from '../modules/MessageModule'

import { WelcomePopover } from './WelcomePopover'
import { GenerateButton } from '../components/GenerateButton'
import { ResetButton } from '../components/ResetButton'

type EventDrivenChange = (e: ChangeEvent<HTMLInputElement>) => void

interface FileInputProps {
    shadeRamp: string | null
    width: number | null
    height: number | null
    message: string | null
    greyScale: boolean
    handleFileChange: EventDrivenChange
    handleWidthChange: EventDrivenChange
    handleHeightChange: EventDrivenChange
    handleShadeRampChange: EventDrivenChange
    handleGreyscale: EventDrivenChange
    handleReset: () => void
    applyResize: () => void
    handleGenerate: () => void
}

export function SettingsForm({
    shadeRamp,
    width,
    height,
    message,
    greyScale,
    handleFileChange,
    handleWidthChange,
    handleHeightChange,
    handleShadeRampChange,
    handleGreyscale,
    handleReset,
    applyResize,
    handleGenerate,
}: FileInputProps) {
    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll py-4">
            <ImageSelect handleFileChange={handleFileChange} />
            <ShadeRamp
                shadeRamp={shadeRamp}
                handleShadeRampChange={handleShadeRampChange}
                handleGenerate={handleGenerate}
            />
            <Size
                handleHeightChange={handleHeightChange}
                handleWidthChange={handleWidthChange}
                applyResize={applyResize}
                width={width}
                height={height}
            />
            <Filters greyScale={greyScale} handleGreyscale={handleGreyscale} />
            <GenerateButton label="Generate" onClick={handleGenerate} />
            <ResetButton label="Reset" onClick={handleReset} />
            <WelcomePopover />
            <MessageModule message={message} />
        </div>
    )
}
