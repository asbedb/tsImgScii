interface CarouselItemProps {
    children: React.ReactNode
}
export function CarouselItem({ children }: CarouselItemProps) {
    return (
        <div className="flex min-w-full snap-center items-center justify-center">
            {children}
        </div>
    )
}
