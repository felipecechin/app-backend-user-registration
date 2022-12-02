import 'express-async-errors'
import 'dotenv/config'
import express from 'express'

import handleErrors from '@/shared/middlewares/handleErrors'
import routes from '@/config/routes'

import { createConnection, dataRepositories } from './database'

createConnection()
    .then(async () => {
        // const savedUser = await dataRepositories.userRepository.save({
        // email: 'feafea',
        // name: 'feafae',
        // password: 'feafae',
        // individualNumber: 'feafae',
        // workerNumber: 'feafae',
        // address: {
        //     street: 'feafae',
        //     number: 4,
        //     complement: 'feafae',
        //     city: 'feafae',
        //     state: 'feafae',
        //     country: 'feafae',
        //     zip: 'feafae',
        // },
        // })
        // console.log({ savedUser })
        // console.log('procurar')
        // const user = await dataRepositories.userRepository.findOne({
        //     where: { id: savedUser.id },
        //     relations: ['address'],
        // })
        // const updatedData = {
        //     email: 'ale',
        //     name: 'opa',
        //     address: {
        //         street: 'opa teste',
        //         number: 4,
        //         complement: null,
        //         city: 'feafae',
        //         state: 'feafae',
        //         country: 'feafae',
        //         zip: 'feafae',
        //     },
        // }
        // if (user) {
        //     const addressNew = { ...user.address, ...updatedData.address }
        //     await dataRepositories.userRepository.save({
        //         ...user,
        //         ...updatedData,
        //         address: addressNew,
        //     })
        //     console.log('atualizado')
        // }
        // console.log('excluir')
        // await dataRepositories.userRepository.delete(savedUser.id)
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

const app = express()

app.use(express.json())
app.use(routes)
app.use(handleErrors)

export { app }
