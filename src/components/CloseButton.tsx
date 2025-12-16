interface CloseButtonProps {
    popoverTarget: string
}
export function CloseButton({ popoverTarget }: CloseButtonProps) {
    return (
        <button
            popoverTarget={popoverTarget}
            popoverTargetAction="hide"
            className="bg-purpy-500 hover:bg-purpy-200 flex h-fit w-fit justify-center self-end rounded-full p-4 text-center select-none hover:cursor-pointer"
        >
            ❌ Close
        </button>
    )
}
