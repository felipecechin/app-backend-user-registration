import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'

export default async (userId: number, refreshToken: string): Promise<number> => {
    const deleted = await dataRepositories.refreshTokenRepository.delete({
        refreshToken,
        userId,
    })

    if (deleted.affected) {
        return deleted.affected
    }

    throw new HttpError(500, 'Error deleting refresh token')
}
