import _ from 'lodash'

import { UserModel } from '@/modules/user/database/models/UserModel'
import UserRepository from '@/modules/user/repositories/UserRepository'

interface IParams {
    userId: number
}

type TReturn = Omit<UserModel, 'password'>

export default async ({ userId }: IParams): Promise<TReturn> => {
    const userProfile = await UserRepository.findById(userId)

    return _.omit(userProfile, 'password')
}
