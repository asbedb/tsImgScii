interface AsciiContainerProps {
    content: React.ReactNode | null
}
export function AsciiContainer({ content }: AsciiContainerProps) {
    return (
        <pre className="m-0 overflow-scroll p-0 text-xs leading-[0.9]">
            {content}
        </pre>
    )
}
