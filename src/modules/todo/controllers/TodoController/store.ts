/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

import { TodoModel } from '../../database/models/TodoModel'

interface IResponseBody {
    todo: TodoModel
}

interface IRequestBody {
    description: string
}

export default async (
    req: Request<any, any, IRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const { description } = req.body
    const newTodo = await TodoService.store({ description })

    return res.status(200).send({ todo: newTodo })
}
