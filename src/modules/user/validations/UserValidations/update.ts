import joi from '@/libs/joi'

export default joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    workerNumber: joi.string().required(),
    individualNumber: joi.string().required(),
    address: joi.object({
        street: joi.string().required(),
        number: joi.number().required(),
        complement: joi.string().optional().default(null),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        zip: joi.string().required(),
    }),
})
