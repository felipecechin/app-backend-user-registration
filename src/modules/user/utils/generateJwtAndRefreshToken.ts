import jwt from 'jsonwebtoken'

import env from '@/env'
import RefreshTokenRepository from '@/modules/user/repositories/RefreshTokenRepository'

interface IReturn {
    accessToken: string
    refreshToken: string
}

export default async (userId: number, payload: object = {}): Promise<IReturn> => {
    const accessToken = jwt.sign(payload, env.secretKey, {
        subject: String(userId),
        expiresIn: 60, // 60 seconds
    })

    const refreshToken = await RefreshTokenRepository.create(userId)

    return {
        accessToken,
        refreshToken,
    }
}
