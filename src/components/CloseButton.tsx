interface CloseButtonProps {
    onClick: () => void
}
export function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-purpy-500 hover:bg-purpy-200 flex h-fit w-fit justify-center self-end rounded-full p-4 text-center select-none hover:cursor-pointer"
        >
            ❌ Close
        </button>
    )
}
