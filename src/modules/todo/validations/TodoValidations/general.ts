import joi from '@/libs/joi'

export default joi.object({
    description: joi.string().required(),
    done: joi.boolean().required(),
})
