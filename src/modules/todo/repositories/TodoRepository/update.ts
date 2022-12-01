import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'

interface IUpdateFilter {
    id: number
}

interface IUpdateData {
    description: string
    done: boolean
    startedAt: Date | null
    workTime: number | null
}

export default async (filter: IUpdateFilter, data: IUpdateData): Promise<number> => {
    const updatedTodo = await dataRepositories.todoRepository.update(filter, data)
    if (updatedTodo.affected) {
        return updatedTodo.affected
    }
    throw new HttpError(500, 'Error updating todo')
}
