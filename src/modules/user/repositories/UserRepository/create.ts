import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'
import { UserModel } from '@/modules/user/database/models/UserModel'

interface IData {
    email: string
    password: string
    name: string
    individualNumber: string
    workerNumber: string
    address: {
        street: string
        number: number
        complement: string | null
        city: string
        state: string
        country: string
        zip: string
    }
}

export default async (data: IData): Promise<UserModel> => {
    try {
        const createdUser = await dataRepositories.userRepository.save(data)
        return createdUser
    } catch (error) {
        throw new HttpError(500, 'Error creating user')
    }
}
