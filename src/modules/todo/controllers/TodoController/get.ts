import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

import { TodoModel } from '../../database/models/TodoModel'

interface IResponse {
    todos: {
        count: number
        items: TodoModel[]
    }
}

export default async (req: Request, res: Response<IResponse>, next: NextFunction): Promise<Response<IResponse>> => {
    const { page } = req.query
    const todos = await TodoService.get({ page: Number(page) })

    return res.status(200).send({ todos })
}
