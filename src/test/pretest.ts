import { DataSource } from 'typeorm'

import { createConnection } from '@/config/database'

let connection: DataSource
before(async () => {
    connection = await createConnection()
    await connection.runMigrations()
})

after(async () => {
    await connection.destroy()
})
