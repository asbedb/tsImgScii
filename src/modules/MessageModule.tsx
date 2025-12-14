interface MessageModuleProps {
    message: string | null
}
export function MessageModule({ message }: MessageModuleProps) {
    return (
        <>
            {message && (
                <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
            )}
        </>
    )
}
