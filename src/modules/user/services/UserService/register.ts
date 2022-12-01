import _ from 'lodash'
import bcrypt from 'bcrypt'

import HttpError from '@/shared/utils/HttpError'
import UserRepository from '@/modules/user/repositories/UserRepository'
import validateSchema from '@/shared/utils/validateSchema'

import { UserModel } from '../../database/models/UserModel'
import UserValidations from '../../validations/UserValidations'

interface IParams {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default async (data: IParams): Promise<Pick<UserModel, 'email' | 'id' | 'name'>> => {
    const { name, email, password, confirmPassword } = await validateSchema(UserValidations.register, data)

    const userExists = await UserRepository.findByEmail(email)

    if (userExists) {
        throw new HttpError(400, 'User already exists')
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        throw new HttpError(400, 'Password and confirm password do not match')
    }

    const newUser = {
        name,
        email,
        password: passwordHash,
    }

    const createdUser = await UserRepository.create(newUser)

    return _.omit(createdUser, 'password')
}
