import { Request, Response } from 'express'

import { CategoryRepository } from '@modules/categories/infra/typeorm/repositories/CategoryRepository'
import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService'

export class CategoryController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const categoriesRepository = new CategoryRepository()
    const createCategoryService = new CreateCategoryService(categoriesRepository)

    const categories = await createCategoryService.execute({ name, description })

    return response.status(201).json(categories)
  }
}
