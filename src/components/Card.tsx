import { CloseButton } from './CloseButton'

interface CardProps {
    cardTitle: string
    children: React.ReactNode
    popoverTarget: string
}
export function Card({ cardTitle, children, popoverTarget }: CardProps) {
    return (
        <div className="flex h-fit flex-col gap-4 overflow-hidden overflow-y-scroll rounded-3xl border-2 border-white/40 bg-gray-800 p-8">
            <CloseButton popoverTarget={popoverTarget} />
            <h1 className="text-purpy-50 text-5xl font-extrabold">
                {cardTitle}
            </h1>
            {children}
        </div>
    )
}
