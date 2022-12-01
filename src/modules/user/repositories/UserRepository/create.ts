import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'
import { UserModel } from '../../database/models/UserModel'

interface IParams {
    name: string
    email: string
    password: string
}

export default async (data: IParams): Promise<UserModel> => {
    try {
        const createdUser = await dataRepositories.userRepository.save(data)
        return createdUser
    } catch (error) {
        throw new HttpError(500, 'Error creating user')
    }
}
