import UserRepository from '@/modules/user/repositories/UserRepository'
import validateSchema from '@/shared/utils/validateSchema'

import { ICreateUser } from '../../types/createUser'
import UserValidations from '../../validations/UserValidations'

type TParams = ICreateUser & { id: number }

export default async (data: TParams): Promise<void> => {
    const validatedData = await validateSchema(UserValidations.update, data)

    if (!validatedData.address.complement) {
        validatedData.address.complement = null
    }

    const user = await UserRepository.findById(validatedData.id)
    const newAddress = { ...user.address, ...validatedData.address }

    const newUser = {
        ...user,
        ...validatedData,
        address: newAddress,
    }

    await UserRepository.update(newUser)
}
