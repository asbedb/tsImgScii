import { LOCAL_STORAGE_KEY, MODIFIED_STORAGE_KEY } from '../const'

export function saveImageToLocal(
    imageUpload: File
): Promise<string | undefined> {
    if (!imageUpload || imageUpload.type.indexOf('image/') !== 0) {
        return Promise.resolve(undefined)
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const dataUrl = event.target?.result as string
                localStorage.setItem(LOCAL_STORAGE_KEY, dataUrl)
                localStorage.setItem(MODIFIED_STORAGE_KEY, dataUrl)
                resolve(dataUrl)
            } catch (e) {
                reject(e)
            }
        }
        reader.onerror = (error) => {
            reject(error)
        }
        reader.readAsDataURL(imageUpload)
    })
}
