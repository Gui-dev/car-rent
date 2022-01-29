import { Router } from 'express'
import multer from 'multer'

import { CategoryController } from '@modules/categories/infra/http/controllers/CategoryController'
import { ImportController } from '@modules/categories/infra/http/controllers/ImportController'
import multerConfig from '@config/uploadMulter'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin'

const categoriesRouter = Router()
const categoryController = new CategoryController()
const importCategory = new ImportController()

const upload = multer(multerConfig.upload('files'))

categoriesRouter.post('/', ensureAuthenticated, ensureAdmin, categoryController.create)

categoriesRouter.post('/import', ensureAuthenticated, ensureAdmin, upload.single('file'), importCategory.create)

categoriesRouter.get('/', categoryController.index)

export {
  categoriesRouter
}
