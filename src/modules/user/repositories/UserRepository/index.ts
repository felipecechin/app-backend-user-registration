import create from './create'
import find from './find'
import findByEmail from './findByEmail'
import findById from './findById'

const UserRepository = {
    create,
    findByEmail,
    find,
    findById,
}

export default UserRepository
