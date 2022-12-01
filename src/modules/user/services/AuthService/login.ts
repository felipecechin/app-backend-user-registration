import _ from 'lodash'
import bcrypt from 'bcrypt'

import AuthValidations from '@/modules/user/validations/AuthValidations'
import generateJwt from '@/modules/user/utils/generateJwt'
import HttpError from '@/shared/utils/HttpError'
import UserRepository from '@/modules/user/repositories/UserRepository'
import validateSchema from '@/shared/utils/validateSchema'

import { UserModel } from '../../database/models/UserModel'

interface ILoginReturn {
    access_token: string
    user: Pick<UserModel, 'email' | 'name' | 'id'>
}

interface IParams {
    email: string
    password: string
}

export default async function login(data: IParams): Promise<ILoginReturn> {
    const validatedLoginData = await validateSchema(AuthValidations.login, data)

    const { email, password } = validatedLoginData

    const userExists = await UserRepository.findByEmail(email)

    if (!userExists) {
        throw new HttpError(400, 'Wrong email or password')
    }

    if (!bcrypt.compareSync(password, userExists.password)) {
        throw new HttpError(400, 'Wrong email or password')
    }

    const userWithoutPassword = _.omit(userExists, 'password')
    const tokens = await generateJwt(userWithoutPassword.id, userWithoutPassword)

    return {
        access_token: tokens.accessToken,
        user: userWithoutPassword,
    }
}
