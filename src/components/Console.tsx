interface ConsoleProps {
    content: React.ReactNode
}
export function Console({ content }: ConsoleProps) {
    return (
        <div className="flex h-full w-full items-center justify-center overflow-scroll border-2 border-blue-800/40 bg-blue-950/50">
            <pre className="m-0 flex h-full w-full items-center justify-center p-0 text-xs leading-[0.9]">
                {content}
            </pre>
        </div>
    )
}
