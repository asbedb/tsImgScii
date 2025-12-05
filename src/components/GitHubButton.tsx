export function GitHubButton() {
    const openGitHub = () => {
        window.open('https://github.com/asbedb/tsImgScii', '_blank')?.focus()
    }
    return (
        <button
            onClick={openGitHub}
            className="hover:bg-purpy-200 bg-purpy-500 my-4 flex h-fit w-fit rounded-full p-4 text-center select-none hover:cursor-pointer"
        >
            Project GitHub Link
        </button>
    )
}
