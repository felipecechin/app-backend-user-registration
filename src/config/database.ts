import 'reflect-metadata'

import { DataSource } from 'typeorm'

import env from '@/env'
import { UserModel } from '@/modules/user/database/models/UserModel'

export const AppDataSource = new DataSource({
    type: 'mysql',
    ...env.mySqlConnection,
    logging: false,
    entities: ['src/modules/**/database/models/*.ts'],
    migrations: ['src/modules/**/database/migrations/*.ts'],
    subscribers: [],
})

export const dataRepositories = {
    userRepository: AppDataSource.getRepository(UserModel),
}

export const createConnection = async (): Promise<DataSource> => {
    return await AppDataSource.initialize()
}
