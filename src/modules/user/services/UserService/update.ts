import { ICreateUser } from '@/modules/user/types/createUser'
import UserRepository from '@/modules/user/repositories/UserRepository'
import UserValidations from '@/modules/user/validations/UserValidations'
import validateSchema from '@/shared/utils/validateSchema'

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
