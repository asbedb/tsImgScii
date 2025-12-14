import { useEffect, useState } from 'react'
import { Console } from '../modules/Console'
import { SettingsForm } from './SettingsForm'
import { Welcome } from './Welcome'

export function NewHome() {
    const [welcomevisible, setWelcomevisible] = useState<boolean>(true)
    const [asciiArt, setAsciiArt] = useState<string | null>(null)
    useEffect(() => {}, [asciiArt, welcomevisible])
    const toggleWelcome = () => {
        setWelcomevisible(!welcomevisible)
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-2">
            <Welcome isVisible={welcomevisible} toggleWelcome={toggleWelcome} />
            <div className="flex h-full w-full overflow-scroll p-2">
                <Console content={asciiArt} />
            </div>
            <SettingsForm
                toggleAbout={toggleWelcome}
                setFinalArt={setAsciiArt}
            />
        </div>
    )
}
