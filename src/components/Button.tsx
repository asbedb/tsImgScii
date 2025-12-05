interface ButtonProps {
    label: string
    onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-purpy-500 hover:bg-purpy-200 flex h-fit w-full justify-center rounded-xl p-2 hover:cursor-pointer"
        >
            {label}
        </button>
    )
}
