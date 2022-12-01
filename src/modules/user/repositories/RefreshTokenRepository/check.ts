import { MoreThan } from 'typeorm'

import { dataRepositories } from '../../../../config/database'

export default async (userId: number, refreshToken: string): Promise<boolean> => {
    const result = await dataRepositories.refreshTokenRepository.findOneBy({
        refreshToken,
        userId,
        expiresDate: MoreThan(new Date()),
    })

    return !!result
}
