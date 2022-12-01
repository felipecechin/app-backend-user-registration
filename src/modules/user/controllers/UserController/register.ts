/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import UserService from '@/modules/user/services/UserService'

import { UserModel } from '../../database/models/UserModel'

interface IRequestBody {
    name: string
    email: string
    password: string
    confirmPassword: string
}

interface IResponseBody {
    newUser: Pick<UserModel, 'email' | 'id' | 'name'>
}

export default async (
    req: Request<any, any, IRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const newUser = await UserService.register({
        ...req.body,
    })

    return res.status(200).send({ newUser })
}
