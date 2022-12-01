import { dataRepositories } from '../../../../config/database'
import HttpError from '../../../../shared/utils/HttpError'

export default async (userId: number): Promise<string> => {
    try {
        const createdRefreshToken = await dataRepositories.refreshTokenRepository.save({
            userId,
            expiresDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
        return createdRefreshToken.refreshToken
    } catch (error) {
        console.log(error)
        throw new HttpError(500, 'Error creating refresh token')
    }
}
