/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

import { TodoModel } from '../../database/models/TodoModel'

interface IResponseBody {
    todo: TodoModel
}

interface IRequestBody {
    description: string
    done: boolean
}

export default async (
    req: Request<any, any, IRequestBody>,
    res: Response<IResponseBody>,
    next: NextFunction
): Promise<Response<IResponseBody>> => {
    const { id } = req.params
    const { description, done } = req.body
    const updatedTodo = await TodoService.update({ id, description, done })

    return res.status(200).send({ todo: updatedTodo })
}
