import UserRepository from '@/modules/user/repositories/UserRepository'

interface IParams {
    userId: number
}

export default async ({ userId }: IParams): Promise<number> => {
    const removed = await UserRepository.removeById(userId)
    return removed
}
