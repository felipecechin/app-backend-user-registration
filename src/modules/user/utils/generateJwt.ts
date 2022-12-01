import jwt from 'jsonwebtoken'

import env from '@/env'

interface IReturn {
    accessToken: string
}

export default async (userId: number, payload: object = {}): Promise<IReturn> => {
    const accessToken = jwt.sign(payload, env.secretKey, {
        subject: String(userId),
        expiresIn: '4h', // 60 seconds
    })

    return {
        accessToken,
    }
}
