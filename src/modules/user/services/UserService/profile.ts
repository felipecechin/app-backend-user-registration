import _ from 'lodash'

import UserRepository from '@/modules/user/repositories/UserRepository'

import { UserModel } from '../../database/models/UserModel'

interface IParams {
    userId: number
}

type TReturn = Omit<UserModel, 'password'>

export default async ({ userId }: IParams): Promise<TReturn> => {
    const userProfile = await UserRepository.findById(userId)

    return _.omit(userProfile, 'password')
}
