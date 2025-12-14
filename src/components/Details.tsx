interface DetailsProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
}
export function Details({ title, children, isOpen }: DetailsProps) {
    return (
        <details className="border border-white/10 p-4" open={isOpen}>
            <summary className="leading-6 font-semibold select-none">
                {title}
            </summary>
            <div className="mt-3 leading-6">{children}</div>
        </details>
    )
}
