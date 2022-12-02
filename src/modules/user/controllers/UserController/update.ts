/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import { ICreateUser } from '@/modules/user/types/createUser'
import { UserModel } from '@/modules/user/database/models/UserModel'
import UserService from '@/modules/user/services/UserService'

type TRequestBody = ICreateUser

interface IResponseBody {
    updated: Omit<UserModel, 'password'>
}

export default async (
    req: Request<any, any, TRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const userId = Number(req.user?.id)
    const updatedUser = await UserService.update({ id: userId, ...req.body })

    return res.status(200).send({ updated: updatedUser })
}
