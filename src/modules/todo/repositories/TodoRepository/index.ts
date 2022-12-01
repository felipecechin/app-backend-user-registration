import create from './create'
import find from './find'
import findById from './findById'
import removeById from './removeById'
import update from './update'

const TodoRepository = {
    find,
    create,
    update,
    findById,
    removeById,
}

export default TodoRepository
