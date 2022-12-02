import create from './create'
import find from './find'
import findByEmail from './findByEmail'
import findById from './findById'
import removeById from './removeById'
import update from './update'

const UserRepository = {
    create,
    findByEmail,
    find,
    findById,
    update,
    removeById,
}

export default UserRepository
