import _ from 'lodash'
import bcrypt from 'bcrypt'
import { expect } from 'chai'

import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'
import { UserModel } from '@/modules/user/database/models/UserModel'

import profile from './profile'

let insertedUser: UserModel

describe('modules/user/services/UserService/profile', () => {
    before(async () => {
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync('12345', salt)
        insertedUser = await dataRepositories.userRepository.save({
            email: 'felipe@hotmail.com',
            name: 'felipe',
            password: passwordHash,
            individualNumber: '123456',
            workerNumber: '123456',
            address: {
                street: 'rua felipe',
                number: 4,
                city: 'Santa Maria',
                state: 'RS',
                country: 'Brasil',
                zip: '97050530',
            },
        })
    })

    after(async () => {
        await dataRepositories.userRepository.delete(insertedUser.id)
    })

    it('should return user data without password by id', async () => {
        const userData = await profile({
            userId: insertedUser.id,
        })
        expect(userData).to.deep.equal({
            ..._.omit(insertedUser, 'password'),
        })
    })

    it('should throw error sending invalid user id', async () => {
        try {
            await profile({
                userId: 0,
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'User not found',
                status: 404,
            })
        }
    })
})
