import bcrypt from 'bcrypt'
import { expect } from 'chai'

import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'
import { UserModel } from '@/modules/user/database/models/UserModel'

import update from './update'

let insertedUser: UserModel

describe('modules/user/services/UserService/update', () => {
    before(async () => {
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync('12345', salt)
        await dataRepositories.userRepository.save({
            email: 'alan@hotmail.com',
            name: 'alan',
            password: passwordHash,
            individualNumber: '9873215',
            workerNumber: '3216549',
            address: {
                street: 'Avenida Dores',
                number: 7,
                city: 'Santa Maria',
                complement: 'Apto 101',
                state: 'RS',
                country: 'Brasil',
                zip: '97050530',
            },
        })
        insertedUser = await dataRepositories.userRepository.save({
            email: 'felipe@hotmail.com',
            name: 'felipe',
            password: passwordHash,
            individualNumber: '123456',
            workerNumber: '234567',
            address: {
                street: 'Avenida Dores',
                number: 7,
                city: 'Santa Maria',
                complement: 'Apto 101',
                state: 'RS',
                country: 'Brasil',
                zip: '97050530',
            },
        })
    })

    after(async () => {
        await dataRepositories.userRepository.createQueryBuilder().delete().from('users').execute()
    })

    it('should update an user', async () => {
        const updatedUser = await update({
            id: insertedUser.id,
            email: 'felipecechin@gmail.com',
            name: 'felipe',
            individualNumber: '654321',
            workerNumber: '987654',
            address: {
                street: 'Avenida Dores',
                number: 7,
                city: 'Santa Maria',
                state: 'RS',
                country: 'Brasil',
                zip: '97050530',
            },
        })
        expect(updatedUser).to.deep.nested.property('address.complement', null)
        expect(updatedUser).to.have.property('email', 'felipecechin@gmail.com')
    })

    it('should throw error when not sending data correctly', async () => {
        try {
            await update({
                id: insertedUser.id,
                email: 'ficechin',
                name: '',
                individualNumber: '161651651',
                workerNumber: '651651651651',
                address: {
                    street: 'Avenida Dores',
                    number: 7,
                    city: 'Torres',
                    state: 'RS',
                    country: 'Brasil',
                    zip: '97050530',
                },
            })
        } catch (error) {
            expect(error).to.be.an.instanceOf(HttpError)
            expect((error as HttpError).toJson()).to.have.property('message', 'ValidationError')
            expect((error as HttpError).toJson()).to.have.property('status', 400)
            expect((error as HttpError).toJson().context)
                .to.be.an('array')
                .that.has.deep.contain({
                    message: '"name" is not allowed to be empty',
                    path: ['name'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"email" must be a valid email',
                    path: ['email'],
                    type: 'string.email',
                })
            expect((error as HttpError).toJson().context).to.have.lengthOf(2)
        }
    })

    it('should throw error sending an existing email', async () => {
        try {
            await update({
                id: insertedUser.id,
                email: 'alan@hotmail.com',
                name: 'felipe',
                individualNumber: '434434343',
                workerNumber: '76767676',
                address: {
                    street: 'Avenida Dores',
                    number: 7,
                    city: 'Santa Maria',
                    state: 'RS',
                    country: 'Brasil',
                    zip: '97050530',
                },
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Email already in use',
                status: 400,
            })
        }
    })

    it('should throw error sending an existing individual number', async () => {
        try {
            await update({
                id: insertedUser.id,
                email: 'felipe@hotmail.com',
                name: 'felipe',
                individualNumber: '9873215',
                workerNumber: '456987',
                address: {
                    street: 'Avenida Dores',
                    number: 7,
                    city: 'Santa Maria',
                    state: 'RS',
                    country: 'Brasil',
                    zip: '97050530',
                },
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Individual number already in use',
                status: 400,
            })
        }
    })

    it('should throw error sending an existing worker number', async () => {
        try {
            await update({
                id: insertedUser.id,
                email: 'felipe@hotmail.com',
                name: 'felipe',
                individualNumber: '789456',
                workerNumber: '3216549',
                address: {
                    street: 'Avenida Dores',
                    number: 7,
                    city: 'Santa Maria',
                    state: 'RS',
                    country: 'Brasil',
                    zip: '97050530',
                },
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Worker number already in use',
                status: 400,
            })
        }
    })
})
