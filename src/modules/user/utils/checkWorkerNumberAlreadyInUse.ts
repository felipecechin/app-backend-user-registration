import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

export default async (workerNumber: string): Promise<void> => {
    const user = await dataRepositories.userRepository.findOneBy({
        workerNumber,
    })

    if (user) {
        throw new HttpError(400, 'Worker number already in use')
    }
}
