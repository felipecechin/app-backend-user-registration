import { dataRepositories } from '@/config/database'

export default async (id: number): Promise<void> => {
    await dataRepositories.userRepository.delete(id)
}
