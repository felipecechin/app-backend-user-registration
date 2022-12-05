import _ from 'lodash'

import HttpError from '@/shared/utils/HttpError'
import { IUpdateUser } from '@/modules/user/types/updateUser'
import { UserModel } from '@/modules/user/database/models/UserModel'
import UserRepository from '@/modules/user/repositories/UserRepository'
import UserValidations from '@/modules/user/validations/UserValidations'
import validateSchema from '@/shared/utils/validateSchema'

type TParams = IUpdateUser & { id: number }

export default async (data: TParams): Promise<Omit<UserModel, 'password'>> => {
    const validatedData = await validateSchema(UserValidations.update, data)

    const user = await UserRepository.findById(validatedData.id)

    const userHasUniqueValues = await UserRepository.findByUniqueFieldsAndNotId(
        validatedData.id,
        validatedData.email,
        validatedData.individualNumber,
        validatedData.workerNumber
    )

    if (userHasUniqueValues !== null) {
        throw new HttpError(400, 'User already exists')
    }

    const newAddress = { ...user.address, ...validatedData.address }

    const newUser = {
        ...user,
        ...validatedData,
        address: newAddress,
    }

    const updatedUser = await UserRepository.update(newUser)

    return _.omit(updatedUser, 'password')
}
