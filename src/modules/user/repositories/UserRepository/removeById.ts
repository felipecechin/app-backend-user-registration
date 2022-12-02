import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

export default async (id: number): Promise<number> => {
    try {
        const result = await dataRepositories.userRepository.delete(id)
        if (result.affected) {
            return result.affected
        }
        throw new HttpError(500, 'Error removing user')
    } catch (error) {
        throw new HttpError(500, 'Error removing user')
    }
}
