import { handleInitialConnection } from './handleInitialConnection'

let dbInstance: IDBDatabase | undefined = undefined

export async function getDB(): Promise<IDBDatabase> {
    if (dbInstance) {
        return dbInstance
    }
    try {
        const db = await handleInitialConnection()
        dbInstance = db
        db.onversionchange = () => {
            console.warn(
                'Database connection is being closed due to version change.'
            )
            db.close()
            dbInstance = undefined
        }
        return db
    } catch (error) {
        console.error(
            'Failed to establish or retrieve a database connection:',
            error
        )
        throw error
    }
}
