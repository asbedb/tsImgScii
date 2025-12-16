import { useImageConvertor } from '../hooks/useImageConvertor'
import { useEffect, useState } from 'react'
import { PreviewContainer } from '../modules/PreviewContainer'
import { SettingsForm } from './SettingsForm'
import { Welcome } from './Welcome'

export function NewHome() {
    const [welcomevisible, setWelcomevisible] = useState<boolean>(true)
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

    useEffect(() => {}, [asciiArt, welcomevisible, originalUrl, previewUrl])
    const toggleWelcome = () => {
        setWelcomevisible(!welcomevisible)
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8">
            <Welcome isVisible={welcomevisible} toggleWelcome={toggleWelcome} />
            <PreviewContainer
                asciiArt={asciiArt}
                originalUrl={originalUrl}
                previewUrl={previewUrl}
            />
            <SettingsForm
                toggleAbout={toggleWelcome}
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
