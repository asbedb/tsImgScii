interface ButtonProps {
    label: string
    onClick?: () => void
    popoverTarget?: string
}

export function Button({ label, onClick, popoverTarget }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-purpy-500 hover:bg-purpy-200 flex h-fit w-full justify-center rounded-xl p-2 hover:cursor-pointer"
            popoverTarget={popoverTarget}
        >
            {label}
        </button>
    )
}
