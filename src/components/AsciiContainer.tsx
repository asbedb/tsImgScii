interface AsciiContainerProps {
    content: React.ReactNode | null
}
export function AsciiContainer({ content }: AsciiContainerProps) {
    return (
        <div className="flex overflow-scroll">
            <pre className="m-0 p-0 text-xs leading-[0.9]">{content}</pre>
        </div>
    )
}
