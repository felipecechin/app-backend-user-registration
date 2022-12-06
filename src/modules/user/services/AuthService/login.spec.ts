import { assert } from 'chai'

import { createConnection } from '@/config/database'

import login from './login'

describe('modules/user/services/AuthService/login', () => {
    before(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
        console.log('Connected to database and ran migrations')
    })

    it('should return 5 when 2 is added to 3', async () => {
        const result = await login({
            email: 'fefea',
            password: 'fefea',
        })

        console.log(result)
    })
})
