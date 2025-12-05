import {
    LOCAL_STORAGE_KEY,
    MODIFIED_STORAGE_KEY,
    STORE_NAME,
} from '../../const'
import { getDB } from './getDB'

export async function loadImageFromIndexedDB(
    isModified: boolean = false
): Promise<HTMLImageElement | undefined> {
    const keyToFetch = isModified ? MODIFIED_STORAGE_KEY : LOCAL_STORAGE_KEY
    const db = await getDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(keyToFetch)
        request.onsuccess = () => {
            const dataObject = request.result
            if (!dataObject || !dataObject.imageString) {
                console.warn(
                    `No image data found in IndexedDB for key: ${keyToFetch}`
                )
                resolve(undefined)
                return
            }
            const imageBase64String: string = dataObject.imageString
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.onload = () => {
                resolve(img)
            }
            img.onerror = (e) => {
                console.error('Error loading image from Data URL.', e)
                reject(new Error('Failed to load image from IndexedDB string.'))
            }
            img.src = imageBase64String
        }
        request.onerror = () => {
            console.error('IndexedDB GET request failed:', request.error)
            reject(new Error(`IndexedDB read error for key ${keyToFetch}.`))
        }
        transaction.onabort = () => {
            reject(new Error('IndexedDB transaction was aborted.'))
        }
        transaction.onerror = () => {
            reject(new Error('IndexedDB transaction failed.'))
        }
    })
}
