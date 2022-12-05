import { Brackets } from 'typeorm'

import { dataRepositories } from '@/config/database'
import { UserModel } from '@/modules/user/database/models/UserModel'

export default async (
    id: number,
    email: string,
    individualNumber: string,
    workerNumber: string
): Promise<UserModel | null> => {
    const user = await dataRepositories.userRepository
        .createQueryBuilder('user')
        .where('user.id != :id', { id })
        .andWhere(
            new Brackets((qb) => {
                qb.where('user.email = :email', { email })
                    .orWhere('user.individualNumber = :individualNumber', { individualNumber })
                    .orWhere('user.workerNumber = :workerNumber', { workerNumber })
            })
        )
        .getOne()

    return user
}
