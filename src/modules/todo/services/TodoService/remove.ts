import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'

import TodoValidations from '../../validations/TodoValidations'
import validateSchema from '../../../../shared/utils/validateSchema'

interface IParams {
    id: number
}

export default async (data: IParams): Promise<void> => {
    await validateSchema(TodoValidations.remove, data)

    await TodoRepository.removeById(data.id)
}
