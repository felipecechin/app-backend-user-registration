import TodoRepository from '@/modules/todo/repositories/TodoRepository'

import { TodoModel } from '../../database/models/TodoModel'

interface IParams {
    page: number
}

interface IReturn {
    count: number
    items: TodoModel[]
}

export default async ({ page }: IParams): Promise<IReturn> => {
    const { count, items } = await TodoRepository.find(page)

    return {
        count,
        items,
    }
}
