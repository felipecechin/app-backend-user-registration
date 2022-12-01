import joi from '@/libs/joi'

export default joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})
