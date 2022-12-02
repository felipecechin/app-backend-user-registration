import UserRepository from '../../repositories/UserRepository'

interface IParams {
    userId: number
}

export default async ({ userId }: IParams): Promise<void> => {
    await UserRepository.removeById(userId)
}
