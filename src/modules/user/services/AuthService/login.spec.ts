import { expect } from 'chai'

import HttpError from '@/shared/utils/HttpError'

import login from './login'

describe('modules/user/services/AuthService/login', () => {
    it('shoud validate if send an invalid email', async () => {
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
})
