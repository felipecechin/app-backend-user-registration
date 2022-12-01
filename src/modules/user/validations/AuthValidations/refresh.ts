import joi from '../../../../libs/joi'

export default joi.object({
    userId: joi.number().required(),
    refreshToken: joi.string().required(),
})
