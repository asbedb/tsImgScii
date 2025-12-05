import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../const'
import { loadImageFromIndexedDB } from '../indexdb-utils/loadImageFromIndexedDB'
import { saveImagetoIndexedDB } from '../indexdb-utils/saveImageToIndexedDB'

export async function resizeImage(
    width?: number,
    height?: number
): Promise<string | undefined> {
    const img = await loadImageFromIndexedDB()
    if (!img) return undefined
    try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return undefined
        if (!width || !height) {
            canvas.width = DEFAULT_WIDTH
            canvas.height = DEFAULT_HEIGHT
            ctx.drawImage(img, 0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT)
        } else {
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)
        }
        const newBase64String = canvas.toDataURL('image/png')
        saveImagetoIndexedDB(newBase64String, true)
        return newBase64String
    } catch (e) {
        console.error(e)
        return undefined
    }
}
