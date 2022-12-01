import { dataRepositories } from '../../../../config/database'
import { UserModel } from '../../database/models/UserModel'

interface IFindReturn {
    count: number
    items: UserModel[]
}

export default async (page?: number): Promise<IFindReturn> => {
    page = page || 1
    const [items, count] = await dataRepositories.userRepository.findAndCount({
        skip: (page - 1) * 5,
        take: 5,
    })

    return {
        count,
        items,
    }
}
