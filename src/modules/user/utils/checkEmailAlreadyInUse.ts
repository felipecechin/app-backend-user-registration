import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

export default async (email: string): Promise<void> => {
    const user = await dataRepositories.userRepository.findOneBy({
        email,
    })

    if (user) {
        throw new HttpError(400, 'Email already in use')
    }
}
