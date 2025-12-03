interface CloseButtonProps {
    onClick: () => void
}
export function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-fit w-fit justify-center self-end rounded-full bg-blue-800 p-4 text-center select-none hover:cursor-pointer hover:bg-blue-600"
        >
            ❌ Close
        </button>
    )
}
