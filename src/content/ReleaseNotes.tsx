import { GitHubButton } from '../components/GitHubButton'

export function ReleaseNotes() {
    return (
        <div className="flex max-w-xl flex-col gap-2">
            <span className="text-xl font-semibold italic">
                tsImgScii is a web-based ASCII Art Generator that transforms
                uploaded images into character-based (text) output.
            </span>
            <span className="text-xl">
                All processing is done client side with zero calls back to a
                server. Image manipulation and text-generation is done within
                the browser and using local storage.
            </span>
            <h2 className="text-3xl font-extrabold text-purple-600">
                Version 1.0
            </h2>
            <span className="wrap-normal">
                At this stage the tool supports:
            </span>
            <ul className="ml-6 list-disc">
                <li>Image selection </li>
                <li>Resizing and generating text based on size flags </li>
                <li>Customising a shade-ramp to stylize text output</li>
                <li>Clipboard support on desktop</li>
                <li>Experimental Greyscale filter flag</li>
            </ul>
            <span className="wrap-normal">Future planned features:</span>
            <ul className="ml-6 list-disc">
                <li>
                    Expansion on filters for fun effects like edge detection.
                </li>
                <li>Colourful Ascii output to match image.</li>
                <li>Further improvements for mobile</li>
            </ul>
            <span className="text-red-500 italic">
                Desktop version recommended for best experience
            </span>
            <GitHubButton />
        </div>
    )
}
