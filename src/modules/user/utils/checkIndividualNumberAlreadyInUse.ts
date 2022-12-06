import { dataRepositories } from '@/config/database'
import HttpError from '@/shared/utils/HttpError'

export default async (individualNumber: string): Promise<void> => {
    const user = await dataRepositories.userRepository.findOneBy({
        individualNumber,
    })

    if (user) {
        throw new HttpError(400, 'Individual number already in use')
    }
}
