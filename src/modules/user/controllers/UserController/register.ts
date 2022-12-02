/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import UserService from '@/modules/user/services/UserService'

import { ICreateUser } from '../../types/createUser'
import { UserModel } from '../../database/models/UserModel'

type TRequestBody = ICreateUser

interface IResponseBody {
    newUser: Pick<UserModel, 'email' | 'id' | 'name'>
}

export default async (
    req: Request<any, any, TRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const newUser = await UserService.register({
        ...req.body,
    })

    return res.status(200).send({ newUser })
}
