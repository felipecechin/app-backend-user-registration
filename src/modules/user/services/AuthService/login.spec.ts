import bcrypt from 'bcrypt'
import { expect } from 'chai'

import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

import login from './login'

describe('modules/user/services/AuthService/login', () => {
    before(async () => {
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync('12345', salt)
        await dataRepositories.userRepository.save({
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
        await dataRepositories.userRepository.delete({
            email: 'felipe@hotmail.com',
        })
    })

    it('shoud throw error sending an invalid email', async () => {
        try {
            await login({
                email: 'fake-email',
                password: 'fake-password',
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'ValidationError',
                status: 400,
                context: [
                    {
                        message: '"email" must be a valid email',
                        path: ['email'],
                        type: 'string.email',
                    },
                ],
            })
        }
    })

    it('shoud throw error sending empty values', async () => {
        try {
            await login({
                email: '',
                password: '',
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'ValidationError',
                status: 400,
                context: [
                    {
                        message: '"email" is not allowed to be empty',
                        path: ['email'],
                        type: 'string.empty',
                    },
                    {
                        message: '"password" is not allowed to be empty',
                        path: ['password'],
                        type: 'string.empty',
                    },
                ],
            })
        }
    })

    it('shoud throw error sending wrong email and password', async () => {
        try {
            await login({
                email: 'felipe@teste.com',
                password: '213131',
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Wrong email or password',
                status: 400,
            })
        }
    })

    it('shoud throw error sending a valid email and an invalid password', async () => {
        try {
            await login({
                email: 'felipe@hotmail.com',
                password: '213131',
            })
            expect.fail()
        } catch (error) {
            expect((error as HttpError).toJson()).to.deep.equal({
                message: 'Wrong email or password',
                status: 400,
            })
        }
    })

    it('shoud return access token sending valid email and password', async () => {
        const response = await login({
            email: 'felipe@hotmail.com',
            password: '12345',
        })

        expect(response).to.have.property('access_token')
    })
})
