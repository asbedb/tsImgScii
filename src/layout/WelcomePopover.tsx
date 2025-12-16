import { Card } from '../components/Card'
import { ReleaseNotes } from '../content/ReleaseNotes'

import { AboutButton } from '../components/AboutBUtton'

export function WelcomePopover() {
    return (
        <>
            <AboutButton label="About" popoverTarget="welcome-popover" />
            <div
                id="welcome-popover"
                popover="manual"
                className={`lex h-full w-svw flex-col items-center justify-center bg-black/60 p-8`}
            >
                <Card
                    cardTitle="Welcome to tsImgScii"
                    popoverTarget="welcome-popover"
                >
                    <ReleaseNotes />
                </Card>
            </div>
        </>
    )
}
