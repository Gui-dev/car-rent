import { Router } from 'express'

import { UserController } from '@modules/users/infra/http/controllers/UserController'

const usersRoutes = Router()
const userController = new UserController()

usersRoutes.post('/', userController.create)

export { usersRoutes }
