interface SettingsButtonProps {
    isOpen?: boolean
    onClick: () => void
}
export function SettingsButton({ isOpen, onClick }: SettingsButtonProps) {
    return (
        <div>
            <button
                onClick={onClick}
                className="hover: relative top-10 right-10 h-fit w-20 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 text-center text-3xl font-bold select-none hover:bg-gray-700"
            >
                {isOpen ? '❌' : '⚙️'}
            </button>
        </div>
    )
}
