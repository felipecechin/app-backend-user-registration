import { NextFunction, Request, Response } from 'express'

import { UserModel } from '@/modules/user/database/models/UserModel'
import UserService from '@/modules/user/services/UserService'

interface IResponseBody {
    profile: Omit<UserModel, 'password'>
}

export default async (
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const userId = Number(req.user?.id)
    const userProfile = await UserService.profile({ userId })

    return res.status(200).send({ profile: userProfile })
}
