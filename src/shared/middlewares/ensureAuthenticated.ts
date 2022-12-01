import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import env from '@/env'
import HttpError from '@/shared/utils/HttpError'

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new HttpError(401, 'Unauthorized')
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub } = verify(token, env.secretKey)

        request.user = {
            id: sub as string,
        }

        next()
    } catch {
        throw new HttpError(401, 'Unauthorized')
    }
}
