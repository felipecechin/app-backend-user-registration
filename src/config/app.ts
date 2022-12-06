import 'express-async-errors'
import 'dotenv/config'
import express from 'express'

import handleErrors from '@/shared/middlewares/handleErrors'
import routes from '@/config/routes'

import { createConnection } from './database'

createConnection()
    .then(async () => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'content-type,Authorization')
    next()
})

app.use(express.json())
app.use(routes)
app.use(handleErrors)

export { app }
