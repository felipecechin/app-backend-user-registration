/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import AuthService from '@/modules/user/services/AuthService'
import HttpError from '@/shared/utils/HttpError'

import { UserModel } from '../../database/models/UserModel'

interface IRequestBody {
    refreshToken: string
}

interface IResponseBody {
    access_token: string
    refresh_token: string
    user: Pick<UserModel, 'email' | 'id' | 'name'>
}

export default async (
    req: Request<any, any, IRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const { refreshToken } = req.body
    if (!req.user?.id) {
        throw new HttpError(401, 'Unauthorized')
    }

    const response = await AuthService.refresh({
        userId: Number(req.user.id),
        refreshToken,
    })

    return res.status(200).send(response)
}
