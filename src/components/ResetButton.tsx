interface ResetButtonProps {
    label: string
    onClick?: () => void
}

export function ResetButton({ label, onClick }: ResetButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-fit w-full justify-center rounded-xl bg-red-700 p-2 hover:cursor-pointer hover:bg-red-500"
        >
            {label}
        </button>
    )
}
