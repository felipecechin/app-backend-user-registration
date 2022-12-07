import bcrypt from 'bcrypt'
import { expect } from 'chai'

import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

import register from './register'

describe('modules/user/services/UserService/register', () => {
    before(async () => {
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync('12345', salt)
        await dataRepositories.userRepository.save({
            email: 'felipe@hotmail.com',
            name: 'felipe',
            password: passwordHash,
            individualNumber: '123456',
            workerNumber: '234567',
            address: {
                street: 'Avenida Dores',
                number: 7,
                city: 'Santa Maria',
                state: 'RS',
                country: 'Brasil',
                zip: '97050530',
            },
        })
    })

    after(async () => {
        await dataRepositories.userRepository.createQueryBuilder().delete().from('users').execute()
    })

    it('should register an user', async () => {
        const insertedUser = await register({
            email: 'ficechin@gmail.com',
            name: 'felipe',
            password: 'felipe10',
            confirmPassword: 'felipe10',
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
        expect(insertedUser).to.have.property('id')
        expect(insertedUser).not.to.have.property('password')
    })

    it('should throw error when not sending data correctly', async () => {
        try {
            await register({
                email: 'ficechin',
                name: 'felipe',
                password: '',
                confirmPassword: '',
                individualNumber: '',
                workerNumber: '',
                address: {
                    street: 'Avenida Dores',
                    number: 7,
                    city: '',
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
                    message: '"password" is not allowed to be empty',
                    path: ['password'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"confirmPassword" is not allowed to be empty',
                    path: ['confirmPassword'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"workerNumber" is not allowed to be empty',
                    path: ['workerNumber'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"individualNumber" is not allowed to be empty',
                    path: ['individualNumber'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"address.city" is not allowed to be empty',
                    path: ['address', 'city'],
                    type: 'string.empty',
                })
                .that.has.deep.contain({
                    message: '"email" must be a valid email',
                    path: ['email'],
                    type: 'string.email',
                })
            expect((error as HttpError).toJson().context).to.have.lengthOf(6)
        }
    })

    it('should throw error sending an existing email', async () => {
        try {
            await register({
                email: 'felipe@hotmail.com',
                name: 'felipe',
                password: 'felipe10',
                confirmPassword: 'felipe10',
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
            await register({
                email: 'felipecechinm@hotmail.com',
                name: 'felipe',
                password: 'felipe10',
                confirmPassword: 'felipe10',
                individualNumber: '123456',
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
            await register({
                email: 'felipecechinm@hotmail.com',
                name: 'felipe',
                password: 'felipe10',
                confirmPassword: 'felipe10',
                individualNumber: '789456',
                workerNumber: '234567',
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

    it('should throw error if password does not match password confirmation', async () => {
        try {
            await register({
                email: 'felipecechinm@hotmail.com',
                name: 'felipe',
                password: 'felipe10',
                confirmPassword: 'felipe11',
                individualNumber: '789456',
                workerNumber: '456789',
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
                message: 'Password and confirm password do not match',
                status: 400,
            })
        }
    })
})
