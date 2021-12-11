import { Router } from 'express'

import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService'
import { CategoryRepository } from '../../typeorm/repositories/CategoryRepository'

const categoriesRouter = Router()

const categoriesRepository = new CategoryRepository()

categoriesRouter.post('/', async (req, res) => {
  const { name, description } = req.body
  const createCategoryService = new CreateCategoryService(categoriesRepository)

  const categories = await createCategoryService.execute({ name, description })

  return res.status(201).json(categories)
})

categoriesRouter.get('/', async (req, res) => {
  const categories = await categoriesRepository.listCategories()
  return res.status(201).json(categories)
})

export {
  categoriesRouter
}
