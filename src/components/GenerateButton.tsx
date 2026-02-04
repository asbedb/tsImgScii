interface GenerateButtonProps {
    label: string
    onClick?: () => void
}

export function GenerateButton({ label, onClick }: GenerateButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-fit w-full justify-center rounded-xl bg-green-700 p-2 hover:cursor-pointer hover:bg-green-500"
        >
            {label}
        </button>
    )
}
