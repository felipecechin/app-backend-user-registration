import 'reflect-metadata'

import { DataSource } from 'typeorm'

import env from '@/env'

import { RefreshTokenModel } from '../modules/user/database/models/RefreshTokenModel'
import { TodoModel } from '../modules/todo/database/models/TodoModel'
import { UserModel } from '../modules/user/database/models/UserModel'

export const AppDataSource = new DataSource({
    type: 'mysql',
    ...env.mySqlConnection,
    logging: false,
    entities: ['src/modules/**/database/models/*.ts'],
    migrations: ['src/modules/**/database/migrations/*.ts'],
    subscribers: [],
})

export const dataRepositories = {
    todoRepository: AppDataSource.getRepository(TodoModel),
    userRepository: AppDataSource.getRepository(UserModel),
    refreshTokenRepository: AppDataSource.getRepository(RefreshTokenModel),
}

export const createConnection = async (): Promise<DataSource> => {
    return await AppDataSource.initialize()
}
