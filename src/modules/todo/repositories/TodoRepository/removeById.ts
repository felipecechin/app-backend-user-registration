import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'

export default async (id: number): Promise<number> => {
    const deletedTodo = await dataRepositories.todoRepository.delete(id)
    if (deletedTodo.affected) {
        return deletedTodo.affected
    }
    throw new HttpError(500, 'Error deleting todo')
}
