import { GitHubButton } from '../components/GitHubButton'
import { OneOne } from './version/OneOne'
import { OneZero } from './version/OneZero'

export function ReleaseNotes() {
    return (
        <div className="flex w-full flex-col gap-2">
            <span className="text-xl font-semibold">
                tsImgScii is a browser based ASCII Art Generator that transforms
                a target image into character-based (text) output. The aim is to
                expand with more image manipulation features in the future.
            </span>
            <span className="text-xl">
                All processing is done client side with zero calls back to a
                server. Image manipulation and text-generation is done within
                the browser and using local storage.
            </span>
            <span className="wrap-normal">Future planned features:</span>
            <ul className="ml-6 list-disc">
                <li>
                    Expansion on filters for fun effects like edge detection.
                </li>
                <li>Colourful Ascii output to match image.</li>
                <li>Further improvements for mobile</li>
            </ul>
            <span className="font-extrabold">
                Desktop version recommended for best experience
            </span>
            <GitHubButton />
            <OneOne />
            <OneZero />
        </div>
    )
}
