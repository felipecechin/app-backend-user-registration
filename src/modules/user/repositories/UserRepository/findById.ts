import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'
import { UserModel } from '../../database/models/UserModel'

export default async (id: number): Promise<UserModel> => {
    const user = await dataRepositories.userRepository.findOneBy({
        id,
    })

    if (user === null) {
        throw new HttpError(404, 'User not found')
    }

    return user
}
