import _ from 'lodash'
import bcrypt from 'bcrypt'

import checkEmailAlreadyInUse from '@/modules/user/utils/checkEmailAlreadyInUse'
import checkIndividualNumberAlreadyInUse from '@/modules/user/utils/checkIndividualNumberAlreadyInUse'
import checkWorkerNumberAlreadyInUse from '@/modules/user/utils/checkWorkerNumberAlreadyInUse'
import HttpError from '@/shared/utils/HttpError'
import { ICreateUser } from '@/modules/user/types/createUser'
import { UserModel } from '@/modules/user/database/models/UserModel'
import UserRepository from '@/modules/user/repositories/UserRepository'
import UserValidations from '@/modules/user/validations/UserValidations'
import validateSchema from '@/shared/utils/validateSchema'

export default async (data: ICreateUser): Promise<Omit<UserModel, 'password'>> => {
    const validatedData = await validateSchema(UserValidations.register, data)

    await checkEmailAlreadyInUse(validatedData.email)
    await checkIndividualNumberAlreadyInUse(validatedData.individualNumber)
    await checkWorkerNumberAlreadyInUse(validatedData.workerNumber)

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(validatedData.password, salt)
    if (!bcrypt.compareSync(validatedData.confirmPassword, passwordHash)) {
        throw new HttpError(400, 'Password and confirm password do not match')
    }

    const user = _.omit(validatedData, ['confirmPassword'])
    user.password = passwordHash

    const createdUser = await UserRepository.create(user)

    return _.omit(createdUser, 'password')
}
