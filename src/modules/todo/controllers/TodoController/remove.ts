import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

interface IResponseBody {
    ok: boolean
}

export default async (
    req: Request,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const { id } = req.params
    await TodoService.remove({ id: Number(id) })

    return res.status(200).send({ ok: true })
}
