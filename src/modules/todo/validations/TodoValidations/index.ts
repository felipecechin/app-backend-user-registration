import remove from '@/modules/todo/validations/TodoValidations/remove'
import store from '@/modules/todo/validations/TodoValidations/store'
import update from '@/modules/todo/validations/TodoValidations/update'

const TodoValidations = {
    store,
    update,
    remove,
}

export default TodoValidations
