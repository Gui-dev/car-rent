import { Router } from 'express'

import { CategoryController } from '@modules/categories/infra/http/controllers/CategoryController'

const categoriesRouter = Router()
const categoryController = new CategoryController()

categoriesRouter.post('/', categoryController.create)

categoriesRouter.get('/', categoryController.index)

export {
  categoriesRouter
}
