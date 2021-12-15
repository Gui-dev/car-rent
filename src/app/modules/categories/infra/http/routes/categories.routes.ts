import { Router } from 'express'

import { CategoryController } from '@modules/categories/infra/http/controllers/CategoryController'
import { CategoryRepository } from '../../typeorm/repositories/CategoryRepository'

const categoriesRouter = Router()

const categoryController = new CategoryController()
const categoriesRepository = new CategoryRepository()

categoriesRouter.post('/', categoryController.create)

categoriesRouter.get('/', async (req, res) => {
  const categories = await categoriesRepository.listCategories()
  return res.status(201).json(categories)
})

export {
  categoriesRouter
}
