interface ButtonProps {
    label: string
    onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-fit w-full justify-center rounded-xl bg-blue-500 p-2"
        >
            {label}
        </button>
    )
}
