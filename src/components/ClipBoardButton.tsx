interface ClipBoardButtonProps {
    isCopied?: boolean
    onClick: () => void
}
export function ClipboardButton({ isCopied, onClick }: ClipBoardButtonProps) {
    return (
        <div>
            <button
                onClick={onClick}
                className="top-10 left-10 z-10 hidden h-fit w-20 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 text-center text-3xl font-bold select-none hover:bg-gray-700 md:absolute md:flex"
            >
                {isCopied ? '✅' : '📋'}
            </button>
        </div>
    )
}
