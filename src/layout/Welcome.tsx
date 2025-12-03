interface WelcomeProps {
    children: React.ReactNode
    isVisible: boolean
}
export function Welcome({ children, isVisible }: WelcomeProps) {
    return (
        <div
            className={`${isVisible ? 'absolute block' : 'hidden'} z-20 flex h-full w-svw flex-col items-center justify-center bg-black/60 p-8`}
        >
            {children}
        </div>
    )
}
