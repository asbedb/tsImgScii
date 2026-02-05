interface AsciiContainerProps {
    content: React.ReactNode | null
    rows: number
    cols: number
}

export function AsciiContainer({ content, rows, cols }: AsciiContainerProps) {
    return (
        <pre
            className="m-0 h-full w-full overflow-hidden p-0 font-mono leading-[0.9]"
            style={{
                fontSize: `min(calc(100cqw / ${rows}), calc(60vh / ${cols} * 0.5))`,
            }}
        >
            {content}
        </pre>
    )
}
