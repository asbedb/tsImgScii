import { STORE_NAME } from '../../const'
import { getDB } from './getDB'

export async function clearImageStore(): Promise<void> {
    const db = await getDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.clear()
        request.onerror = () => reject(new Error('Error clearing store'))
        transaction.oncomplete = () => resolve()
        transaction.onerror = () =>
            reject(new Error('Error finalising transaction'))
    })
}
