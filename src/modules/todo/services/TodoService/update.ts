import TodoRepository from '@/modules/todo/repositories/TodoRepository'
import TodoValidations from '@/modules/todo/validations/TodoValidations'
import validateSchema from '@/shared/utils/validateSchema'

import { TodoModel } from '../../database/models/TodoModel'

interface IParams {
    description: string
    done: boolean
    id: number
}

export default async (data: IParams): Promise<TodoModel> => {
    const newData = await validateSchema(TodoValidations.update, data, false, true)

    const todoToUpdate = await TodoRepository.findById(data.id)

    let newTodo = { ...todoToUpdate }

    if (newTodo.startedAt && newData.done) {
        const timeDifference = Math.abs(newTodo.startedAt.getTime() - new Date().getTime())
        const timeInSeconds = timeDifference / 1000
        if (newTodo.workTime) {
            newTodo.workTime = newTodo.workTime + timeInSeconds
        } else {
            newTodo.workTime = timeInSeconds
        }
        newTodo.startedAt = null
    }
    newTodo = {
        ...newTodo,
        ...newData,
    }

    await TodoRepository.update({ id: data.id }, newTodo)

    return newTodo
}
