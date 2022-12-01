import TodoRepository from '@/modules/todo/repositories/TodoRepository'
import TodoValidations from '@/modules/todo/validations/TodoValidations'
import validateSchema from '@/shared/utils/validateSchema'

import { TodoModel } from '../../database/models/TodoModel'

interface IParams {
    description: string
}

export default async (data: IParams): Promise<TodoModel> => {
    const validatedData = await validateSchema(TodoValidations.store, data)

    const createdTodo = await TodoRepository.create(validatedData)

    return createdTodo
}
