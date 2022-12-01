import { dataRepositories } from '../../../../config/database'
import { UserModel } from '../../database/models/UserModel'

export default async (email: string): Promise<UserModel | null> => {
    const user = await dataRepositories.userRepository.findOneBy({
        email,
    })

    return user
}
