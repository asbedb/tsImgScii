import { loadImageFromIndexedDB } from '../indexdb-utils/loadImageFromIndexedDB'
import { saveImagetoIndexedDB } from '../indexdb-utils/saveImageToIndexedDB'

export async function greyScaleFilter(): Promise<string | undefined> {
    let img = await loadImageFromIndexedDB(true)
    if (!img) {
        img = await loadImageFromIndexedDB()
    }
    if (!img) return undefined
    try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return undefined
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data // This is a Uint8ClampedArray: [R, G, B, A, R, G, B, A, ...]

        for (let i = 0; i < data.length; i += 4) {
            const avg =
                0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
            data[i] = avg // Red
            data[i + 1] = avg // Green
            data[i + 2] = avg // Blue
        }
        ctx.putImageData(imageData, 0, 0)
        const newBase64String = canvas.toDataURL('image/png')
        saveImagetoIndexedDB(newBase64String, true)
        return newBase64String
    } catch (e) {
        console.error(e)
        return undefined
    }
}
