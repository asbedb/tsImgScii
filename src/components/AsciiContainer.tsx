import { useEffect, useRef } from 'react'

interface AsciiContainerProps {
    content: string | null
    cols: number | null
    rows: number | null
}

export function AsciiContainer({ content, cols, rows }: AsciiContainerProps) {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const transform = useRef({ scale: 1, x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasEl.current
        if (!canvas || !content || !rows || !cols) return
        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.save()

        ctx.scale(dpr, dpr)

        const artAspectRatio = cols / rows
        const canvasAspectRatio = rect.width / rect.height

        let fitScale = 1
        if (artAspectRatio > canvasAspectRatio) {
            fitScale = rect.width / cols
        } else {
            fitScale = rect.height / rows
        }

        const offsetX = (rect.width - cols * fitScale) / 2
        const offsetY = (rect.height - rows * fitScale) / 2

        ctx.translate(
            offsetX + transform.current.x,
            offsetY + transform.current.y
        )
        ctx.scale(transform.current.scale, transform.current.scale)
        const cellW = fitScale
        const cellH = fitScale
        ctx.font = `${cellH}px monospace`
        ctx.textBaseline = 'top'
        ctx.fillStyle = 'white'

        const lines = content.split('\n')
        if (lines.length > 0) {
            const firstLine = lines[0]
            const naturalWidth = ctx.measureText(firstLine).width
            const targetWidth = cols * cellW
            const spacing = (targetWidth - naturalWidth) / firstLine.length
            ctx.letterSpacing = `${spacing}px`
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 0, i * cellH)
            }
        }
        ctx.restore()
    }, [cols, content, rows])

    return <canvas ref={canvasEl} className="block h-full w-full" />
}
