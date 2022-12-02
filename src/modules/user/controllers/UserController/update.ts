/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import UserService from '@/modules/user/services/UserService'

import { ICreateUser } from '../../types/createUser'

type TRequestBody = ICreateUser

interface IResponseBody {
    updated: boolean
}

export default async (
    req: Request<any, any, TRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const userId = Number(req.user?.id)
    await UserService.update({ id: userId, ...req.body })

    return res.status(200).send({ updated: true })
}
