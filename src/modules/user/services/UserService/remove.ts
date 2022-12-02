import UserRepository from '@/modules/user/repositories/UserRepository'

interface IParams {
    userId: number
}

export default async ({ userId }: IParams): Promise<void> => {
    await UserRepository.removeById(userId)
}
