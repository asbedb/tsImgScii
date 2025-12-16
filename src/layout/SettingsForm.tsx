import { type ChangeEvent } from 'react'
import { ImageSelect } from '../modules/ImageSelect'
import { ShadeRamp } from '../modules/ShadeRamp'
import { Size } from '../modules/Size'
import { Experimental } from '../modules/Experimental'
import { MessageModule } from '../modules/MessageModule'

import { Button } from '../components/Button'

type EventDrivenChange = (e: ChangeEvent<HTMLInputElement>) => void

interface FileInputProps {
    toggleAbout: () => void
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
    toggleAbout,
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
            <Experimental
                greyScale={greyScale}
                handleGreyscale={handleGreyscale}
            />
            <Button label="Generate" onClick={handleGenerate} />
            <Button label="Reset" onClick={handleReset} />
            <Button label="About" onClick={toggleAbout} />
            <MessageModule message={message} />
        </div>
    )
}
