import { Router } from 'express'
import multer from 'multer'

import { UserController } from '@modules/users/infra/http/controllers/UserController'
import { UpdateUserAvatarController } from '@modules/users/infra/http/controllers/UpdateUserAvatarController'
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import multerConfig from '@config/uploadMulter'

const usersRoutes = Router()
const userController = new UserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const upload = multer(multerConfig.upload('avatar'))

usersRoutes.post('/', userController.create)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.create
)

export { usersRoutes }
