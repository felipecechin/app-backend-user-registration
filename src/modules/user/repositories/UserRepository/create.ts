import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'
import { ICreateUser } from '../../types/createUser'
import { UserModel } from '../../database/models/UserModel'

export default async (data: ICreateUser): Promise<UserModel> => {
    try {
        const createdUser = await dataRepositories.userRepository.save(data)
        return createdUser
    } catch (error) {
        throw new HttpError(500, 'Error creating user')
    }
}
