export function GitHubButton() {
    const openGitHub = () => {
        window.open('', '_blank')?.focus()
    }
    return (
        <button
            onClick={openGitHub}
            className="flex h-fit w-fit justify-center self-center rounded-full bg-blue-800 p-4 text-center select-none hover:cursor-pointer hover:bg-blue-600"
        >
            Project GitHub Link
        </button>
    )
}
