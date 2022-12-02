import { Router } from 'express'

import AuthController from '@/modules/user/controllers/AuthController'
import ensureAuthenticated from '@/shared/middlewares/ensureAuthenticated'
import UserController from '@/modules/user/controllers/UserController'

const userRoutes = Router()

userRoutes.post('/', UserController.register)
userRoutes.post('/login', AuthController.login)
userRoutes.get('/', ensureAuthenticated, UserController.profile)
userRoutes.put('/', ensureAuthenticated, UserController.update)
userRoutes.delete('/', ensureAuthenticated, UserController.remove)

export default userRoutes
