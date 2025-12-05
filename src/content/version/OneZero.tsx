export function OneZero() {
    return (
        <div>
            <h2 className="text-purpy-50 text-3xl font-extrabold">
                Version 1.0 [
                <span className="text-2xl text-white">03/12/2025</span>]
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
        </div>
    )
}
