import _ from 'lodash'

import checkEmailAlreadyInUse from '@/modules/user/utils/checkEmailAlreadyInUse'
import checkIndividualNumberAlreadyInUse from '@/modules/user/utils/checkIndividualNumberAlreadyInUse'
import checkWorkerNumberAlreadyInUse from '@/modules/user/utils/checkWorkerNumberAlreadyInUse'
import { IUpdateUser } from '@/modules/user/types/updateUser'
import { UserModel } from '@/modules/user/database/models/UserModel'
import UserRepository from '@/modules/user/repositories/UserRepository'
import UserValidations from '@/modules/user/validations/UserValidations'
import validateSchema from '@/shared/utils/validateSchema'

type TParams = IUpdateUser & { id: number }

export default async (data: TParams): Promise<Omit<UserModel, 'password'>> => {
    const validatedData = await validateSchema(UserValidations.update, data)

    const user = await UserRepository.findById(validatedData.id)

    if (user.email !== validatedData.email) {
        await checkEmailAlreadyInUse(validatedData.email)
    }

    if (user.individualNumber !== validatedData.individualNumber) {
        await checkIndividualNumberAlreadyInUse(validatedData.individualNumber)
    }

    if (user.workerNumber !== validatedData.workerNumber) {
        await checkWorkerNumberAlreadyInUse(validatedData.workerNumber)
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
