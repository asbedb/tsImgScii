import { useState, useEffect } from 'react'
import { Console } from '../modules/PreviewContainer'
import { SettingsForm } from './SettingsForm'
import { Settings } from './Settings'
import { SettingsButton } from '../components/SettingsButton'
import { ClipboardButton } from '../components/ClipBoardButton'
import { Welcome } from './Welcome'

export function Home() {
    const [welcomevisible, setWelcomevisible] = useState<boolean>(true)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [asciiArt, setAsciiArt] = useState<string | null>(null)
    const [settingsVisible, setSettingsVisible] = useState<boolean>(false)

    useEffect(() => {}, [asciiArt, settingsVisible, welcomevisible])

    const writeToClipboard = async () => {
        if (!asciiArt) return
        try {
            await navigator.clipboard.writeText(asciiArt)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 3000)
        } catch (e) {
            console.error(`Error in copying ${e}`)
            setIsCopied(false)
        }
    }

    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible)
    }

    const toggleWelcome = () => {
        setWelcomevisible(!welcomevisible)
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <Welcome isVisible={welcomevisible} toggleWelcome={toggleWelcome} />
            <Console content={asciiArt} />
            <ClipboardButton onClick={writeToClipboard} isCopied={isCopied} />
            <div className="absolute top-0 right-0 z-10 flex h-full max-w-[95%]">
                <SettingsButton
                    onClick={toggleSettings}
                    isOpen={settingsVisible}
                />
                <Settings settingsVisible={settingsVisible}>
                    <SettingsForm
                        setFinalArt={setAsciiArt}
                        toggleAbout={toggleWelcome}
                    />
                </Settings>
            </div>
        </div>
    )
}
