import _ from 'lodash'

import generateJwtAndRefreshToken from '@/modules/user/utils/generateJwtAndRefreshToken'
import HttpError from '@/shared/utils/HttpError'
import RefreshTokenRepository from '@/modules/user/repositories/RefreshTokenRepository'
import UserRepository from '@/modules/user/repositories/UserRepository'

import AuthValidations from '../../validations/AuthValidations'
import { UserModel } from '../../database/models/UserModel'
import validateSchema from '../../../../shared/utils/validateSchema'

interface IRefreshTokenReturn {
    access_token: string
    refresh_token: string
    user: Pick<UserModel, 'email' | 'name' | 'id'>
}

interface IParams {
    userId: number
    refreshToken: string
}

export default async function refresh(data: IParams): Promise<IRefreshTokenReturn> {
    const validatedData = await validateSchema(AuthValidations.refresh, data)

    const { userId, refreshToken } = validatedData

    const userExists = await UserRepository.findById(userId)

    const userWithoutPassword = _.omit(userExists, 'password')

    const isValidRefreshToken = await RefreshTokenRepository.check(userWithoutPassword.id, refreshToken)

    if (!isValidRefreshToken) {
        throw new HttpError(400, 'Invalid refresh token')
    }

    await RefreshTokenRepository.invalidate(userWithoutPassword.id, refreshToken)

    const tokens = await generateJwtAndRefreshToken(userWithoutPassword.id, userWithoutPassword)

    return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        user: userWithoutPassword,
    }
}
