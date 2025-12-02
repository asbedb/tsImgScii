interface ConsoleProps {
    content: React.ReactNode;
}
export function Console({ content }: ConsoleProps) {
    return (
        <div className=" flex p-8 flex-col border-2 border-blue-800/40 bg-blue-950/50 overflow-y-scroll ">
            <pre className="m-0 p-0 leading-[0.9] text-xs">{content}</pre>
        </div>
    );
}
