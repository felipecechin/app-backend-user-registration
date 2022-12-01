import { Router } from 'express'

import AuthController from '@/modules/user/controllers/AuthController'
import UserController from '@/modules/user/controllers/UserController'

const userRoutes = Router()

userRoutes.post('/register', UserController.register)
userRoutes.get('/', UserController.get)
userRoutes.post('/login', AuthController.login)

export default userRoutes
