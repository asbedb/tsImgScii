export function OneOne() {
    return (
        <div>
            <h2 className="text-purpy-50 text-3xl font-extrabold">
                Version 1.1 [
                <span className="text-2xl text-white">05/12/2025</span>]
            </h2>
            <span className="wrap-normal">
                UI Updates and Changes to local storage:
            </span>
            <ul className="ml-6 list-disc">
                <li>Custom colours for buttons and input </li>
                <li>Hover effects for buttons </li>
                <li>
                    Changed browser API calls to use IndexDB to avoid issues
                    with size of images
                </li>
                <li>Clipboard support on desktop</li>
                <li>Experimental Greyscale filter flag</li>
                <li>
                    Further streamlined folder structure to help with future
                    refactors
                </li>
            </ul>
        </div>
    )
}
