interface AboutButtonProps {
    popoverTarget: string
    label: string
}
export function AboutButton({ popoverTarget, label }: AboutButtonProps) {
    return (
        <button
            className="flex h-fit w-full justify-center rounded-xl bg-blue-800 p-2 hover:cursor-pointer hover:bg-blue-600"
            popoverTarget={popoverTarget}
        >
            {label}
        </button>
    )
}
