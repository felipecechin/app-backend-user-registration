import bcrypt from 'bcrypt'
import { expect } from 'chai'

import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'
import { UserModel } from '@/modules/user/database/models/UserModel'

import remove from './remove'

let insertedUser: UserModel

describe('modules/user/services/UserService/remove', () => {
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

    it('should remove an user by id', async () => {
        const removed = await remove({
            userId: insertedUser.id,
        })
        expect(removed).to.be.equal(1)
    })

    it('should throw error deleting an invalid user id', async () => {
        try {
            await remove({
                userId: -3,
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Error removing user',
                status: 500,
            })
        }
    })
})
