import { loadImageFromLocal } from './load'

export async function luminanceMap(): Promise<Array<number> | undefined> {
    const img = await loadImageFromLocal(true)
    if (!img) return undefined
    try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return undefined
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        // calculate our luminance map first
        let j = 0
        const totalPixels = canvas.width * canvas.height
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data // This is a Uint8ClampedArray: [R, G, B, A, R, G, B, A, ...]
        const luminanceMap: number[] = new Array(totalPixels)
        for (let i = 0; i < data.length; i += 4) {
            const luminance =
                0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
            luminanceMap[j] = Math.round(luminance)
            j++
        }
        return luminanceMap
    } catch (e) {
        console.error(e)
        return undefined
    }
}
