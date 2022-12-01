import 'express-async-errors'
import 'dotenv/config'
import express from 'express'

import handleErrors from '@/shared/middlewares/handleErrors'
import routes from '@/config/routes'

import { createConnection } from './database'

createConnection()
    .then(() => {
        console.log('Database connected')
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
