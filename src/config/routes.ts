import { Router } from 'express'

import todoRoutes from '@/modules/todo'
import userRoutes from '@/modules/user'

const routes = Router()

routes.use('/todo', todoRoutes)
routes.use('/user', userRoutes)

export default routes
