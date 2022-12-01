import joi from '../../../../libs/joi'

export default joi.object({
    id: joi.number().required(),
})
