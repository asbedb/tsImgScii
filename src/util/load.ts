import { LOCAL_STORAGE_KEY, MODIFIED_STORAGE_KEY } from '../const'
export function loadImageFromLocal(
    isModified?: boolean
): Promise<HTMLImageElement | undefined> {
    let imageBase64String: string | null = ''
    if (isModified) {
        imageBase64String = localStorage.getItem(MODIFIED_STORAGE_KEY)
    } else {
        imageBase64String = localStorage.getItem(LOCAL_STORAGE_KEY)
    }
    if (!imageBase64String) {
        console.warn(
            `No image found in Local Storage under key: ${LOCAL_STORAGE_KEY}`
        )
        return Promise.resolve(undefined)
    }
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (e) => {
            console.error('Error loading image from Data URL.', e)
            reject(new Error('Failed to load image from Local Storage string.'))
        }
        img.src = imageBase64String
    })
}
