import { DB_NAME, DB_VERSION, STORE_NAME } from '../../const'
export async function handleInitialConnection(): Promise<IDBDatabase> {
    // Function is structured to either
    // Open existing store
    // create a new store if one does not exist
    // upgrade a store to the latest version when indexdb changes
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION)
        request.onsuccess = () => {
            const db = request.result
            console.log('Database opened successfully')
            resolve(db)
        }
        request.onerror = () => {
            console.error('IndexedDB error:', request.error)
            reject(new Error(`IndexedDB error: ${request.error?.message}`))
        }
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result
            console.log('Database upgrade needed/creating store')
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' })
                console.log(`Object Store '${STORE_NAME}' created`)
            }
        }
    })
}
