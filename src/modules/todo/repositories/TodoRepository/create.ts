import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'
import { TodoModel } from '../../database/models/TodoModel'

interface IParams {
    description: string
}

export default async (data: IParams): Promise<TodoModel> => {
    try {
        const createdTodo = await dataRepositories.todoRepository.save(data)
        return createdTodo
    } catch (error) {
        throw new HttpError(500, 'Error creating todo')
    }
}
