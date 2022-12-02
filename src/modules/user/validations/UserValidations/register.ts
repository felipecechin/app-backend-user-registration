import joi from '@/libs/joi'

// individualNumber: string
//     workerNumber: string
//     address: {
//         street: string
//         number: number
//         complement: string
//         city: string
//         state: string
//         country: string
//         zip: string
//     }

export default joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    workerNumber: joi.string().required(),
    individualNumber: joi.string().required(),
    address: joi.object({
        street: joi.string().required(),
        number: joi.string().required(),
        complement: joi.string().optional(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        zip: joi.string().required(),
    }),
})
