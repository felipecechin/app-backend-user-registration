import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'
import { TodoModel } from '../../database/models/TodoModel'

export default async (id: number): Promise<TodoModel> => {
    const todo = await dataRepositories.todoRepository.findOneBy({ id })

    if (todo === null) {
        throw new HttpError(404, 'Todo not found')
    }

    return todo
}
