import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'
import { UserModel } from '@/modules/user/database/models/UserModel'

export default async (id: number, withAddress = true): Promise<UserModel> => {
    const params: Record<string, string[] | object> = {
        where: {
            id,
        },
    }
    if (withAddress) {
        params.relations = ['address']
    }
    const user = await dataRepositories.userRepository.findOne(params)

    if (user === null) {
        throw new HttpError(404, 'User not found')
    }

    return user
}
