import { dataRepositories } from '../../../../config/database'
import { TodoModel } from '../../database/models/TodoModel'

interface IReturn {
    count: number
    items: TodoModel[]
}

export default async (page: number): Promise<IReturn> => {
    page = page || 1
    const [items, count] = await dataRepositories.todoRepository.findAndCount({
        skip: (page - 1) * 5,
        take: 5,
    })

    return {
        count,
        items,
    }
}
