import _ from 'lodash'
import bcrypt from 'bcrypt'

import HttpError from '@/shared/utils/HttpError'
import UserRepository from '@/modules/user/repositories/UserRepository'
import validateSchema from '@/shared/utils/validateSchema'

import { ICreateUser } from '../../types/createUser'
import { UserModel } from '../../database/models/UserModel'
import UserValidations from '../../validations/UserValidations'

export default async (data: ICreateUser): Promise<Pick<UserModel, 'email' | 'id' | 'name'>> => {
    const validatedData = await validateSchema(UserValidations.register, data)

    const userExists = await UserRepository.findByEmail(validatedData.email)

    if (userExists) {
        throw new HttpError(400, 'User already exists')
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(validatedData.password, salt)
    if (!bcrypt.compareSync(validatedData.confirmPassword, passwordHash)) {
        throw new HttpError(400, 'Password and confirm password do not match')
    }

    const createdUser = await UserRepository.create(validatedData)

    return _.omit(createdUser, 'password')
}
