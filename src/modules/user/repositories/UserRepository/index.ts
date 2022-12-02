import create from './create'
import findByEmail from './findByEmail'
import findById from './findById'
import removeById from './removeById'
import update from './update'

const UserRepository = {
    create,
    findByEmail,
    findById,
    update,
    removeById,
}

export default UserRepository
