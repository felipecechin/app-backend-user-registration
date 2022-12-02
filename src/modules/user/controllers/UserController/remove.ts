import { NextFunction, Request, Response } from 'express'

import UserService from '@/modules/user/services/UserService'

interface IResponseBody {
    removed: boolean
}

export default async (
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const userId = Number(req.user?.id)
    await UserService.remove({ userId })

    return res.status(200).send({ removed: true })
}
