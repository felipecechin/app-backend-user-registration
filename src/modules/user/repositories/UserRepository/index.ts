import create from './create'
import findByEmail from './findByEmail'
import findById from './findById'
import findByIndividualNumber from './findByIndividualNumber'
import findByWorkerNumber from './findByWorkerNumber'
import removeById from './removeById'
import update from './update'

const UserRepository = {
    create,
    findByEmail,
    findById,
    update,
    removeById,
    findByIndividualNumber,
    findByWorkerNumber,
}

export default UserRepository
