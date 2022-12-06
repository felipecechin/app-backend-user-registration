import { dataRepositories } from '@/config/database'
import { UserModel } from '@/modules/user/database/models/UserModel'

export default async (individualNumber: string): Promise<UserModel | null> => {
    const user = await dataRepositories.userRepository.findOneBy({
        individualNumber,
    })

    return user
}
