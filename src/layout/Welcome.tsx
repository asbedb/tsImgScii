import { Card } from '../components/Card'
import { ReleaseNotes } from '../content/ReleaseNotes'
interface WelcomeProps {
    isVisible: boolean
    toggleWelcome: () => void
}
export function Welcome({ isVisible, toggleWelcome }: WelcomeProps) {
    return (
        <div
            className={`${isVisible ? 'absolute block' : 'hidden'} z-20 flex h-full w-svw flex-col items-center justify-center bg-black/60 p-8 md:p-60`}
        >
            <Card
                cardTitle="Welcome to tsImgScii"
                closeFunction={toggleWelcome}
            >
                <ReleaseNotes />
            </Card>
        </div>
    )
}
