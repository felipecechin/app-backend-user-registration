import { NextFunction, Request, Response } from 'express'
import { decode } from 'jsonwebtoken'

import HttpError from '@/shared/utils/HttpError'

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new HttpError(401, 'Token not present')
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub } = decode(token) as { sub: string }

        request.user = {
            id: sub,
        }

        next()
    } catch {
        throw new HttpError(401, 'Token not present')
    }
}
