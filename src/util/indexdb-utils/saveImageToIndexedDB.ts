import {
    LOCAL_STORAGE_KEY,
    MODIFIED_STORAGE_KEY,
    STORE_NAME,
} from '../../const'
import { getDB } from './getDB'

export async function saveImagetoIndexedDB(
    imageBase64String: string,
    isModified: boolean = false
): Promise<void> {
    const keyToSave = isModified ? MODIFIED_STORAGE_KEY : LOCAL_STORAGE_KEY
    const db = await getDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const dataToSave = {
            id: keyToSave,
            imageString: imageBase64String,
            timeStamp: Date.now(),
        }
        const request = store.put(dataToSave)
        // future task to implement a sonner
        request.onsuccess = () => {
            console.log('Ding!')
        }
        request.onerror = (e) => {
            console.error('PUT Request failed', store.transaction.error, e)
            reject(new Error(`Error ${keyToSave}`))
        }
        transaction.oncomplete = () => {
            resolve()
        }
        transaction.onabort = () => {
            reject(new Error('Transaction aborted'))
        }
        transaction.onerror = () => {
            reject(new Error('Transaction level error'))
        }
    })
}
