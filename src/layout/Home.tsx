import { useImageConvertor } from '../hooks/useImageConvertor'
import { useEffect, useState } from 'react'
import { PreviewContainer } from '../modules/PreviewContainer'
import { SettingsForm } from './SettingsForm'

export function Home() {
    const [asciiArt, setAsciiArt] = useState<string | null>(null)
    const {
        // State
        shadeRamp,
        width,
        height,
        message,
        originalUrl,
        previewUrl,
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
    } = useImageConvertor(setAsciiArt)

    useEffect(() => {}, [asciiArt, originalUrl, previewUrl])

    return (
        <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="h-full max-h-[60vh] w-full overflow-hidden">
                <PreviewContainer
                    asciiArt={asciiArt}
                    originalUrl={originalUrl}
                    previewUrl={previewUrl}
                    width={width}
                    height={height}
                />
            </div>
            <SettingsForm
                shadeRamp={shadeRamp}
                width={width}
                height={height}
                message={message}
                greyScale={greyScale}
                handleFileChange={handleFileChange}
                handleWidthChange={handleWidthChange}
                handleHeightChange={handleHeightChange}
                handleShadeRampChange={handleShadeRampChange}
                handleGreyscale={handleGreyscale}
                handleReset={handleReset}
                applyResize={applyResize}
                handleGenerate={handleGenerate}
            />
        </div>
    )
}
