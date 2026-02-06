import { useEffect, useRef } from 'react'

interface AsciiContainerProps {
    content: string | null
    cols: number | null
    rows: number | null
}

export function AsciiContainer({ content, cols, rows }: AsciiContainerProps) {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const transform = useRef({ scale: 1, x: 0, y: 0 })
    const draw = () => {
        if (!content || !rows || !cols || !canvasEl.current) return
        const canvas = canvasEl.current
        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return
        const { offsetWidth: w, offsetHeight: h } = canvas
        const dpr = window.devicePixelRatio || 1
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.save()
        ctx.translate(transform.current.x * dpr, transform.current.y * dpr)
        ctx.scale(transform.current.scale, transform.current.scale)
        const cellW = (w / cols) * dpr
        const cellH = (h / rows) * dpr
        ctx.fillStyle = 'black'
        ctx.fillRect(
            0,
            0,
            canvas.width / transform.current.scale,
            canvas.height / transform.current.scale
        )
        const fontSize = cellH
        ctx.font = `${fontSize}px monospace`
        ctx.textBaseline = 'top'
        ctx.textAlign = 'left'
        ctx.fillStyle = 'white'

        const charWidthInPx = cellW
        ctx.letterSpacing = `${charWidthInPx - ctx.measureText('M').width}px`
        const lines = content.split('\n')
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 0, i * cellH)
        }
        ctx.restore()
    }

    useEffect(() => {
        const canvas = canvasEl.current
        if (!canvas) return

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            if (e.ctrlKey) {
                // Pinch to Zoom (or Ctrl + Scroll)
                const zoomSpeed = 0.01
                const delta = -e.deltaY
                const factor = Math.pow(1.1, delta / 100)
                transform.current.scale *= factor
            } else {
                // Pan
                transform.current.x -= e.deltaX
                transform.current.y -= e.deltaY
            }
            draw()
        }

        canvas.addEventListener('wheel', handleWheel, { passive: false })
        draw() // Initial draw

        return () => canvas.removeEventListener('wheel', handleWheel)
    }, [])

    return (
        <>
            <canvas ref={canvasEl} className="h-full w-full overflow-scroll" />
        </>
    )
}
