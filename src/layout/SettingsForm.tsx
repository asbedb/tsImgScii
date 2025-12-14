import { useImageConvertor } from '../hooks/useImageConvertor'
import { ImageSelect } from '../modules/ImageSelect'
import { ShadeRamp } from '../modules/ShadeRamp'
import { Size } from '../modules/Size'
import { Experimental } from '../modules/Experimental'
import { MessageModule } from '../modules/MessageModule'

import { Button } from '../components/Button'

interface FileInputProps {
    setFinalArt: (art: string | null) => void
    toggleAbout: () => void
}

export function SettingsForm({ setFinalArt, toggleAbout }: FileInputProps) {
    const {
        // State
        shadeRamp,
        width,
        height,
        originalUrl,
        previewUrl,
        message,
        greyScale,
        // Handlers
        handleFileChange,
        handleWidthChange,
        handleHeightChange,
        handleShadeRampChange,
        handleGreyscale,
        handleReset,
        applyResize,
        handleGenerate,
    } = useImageConvertor(setFinalArt)
    return (
        <div className="flex h-full w-full grow flex-col gap-4 overflow-y-scroll py-4">
            <ImageSelect
                handleFileChange={handleFileChange}
                originalUrl={originalUrl}
                previewUrl={previewUrl}
            />
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
