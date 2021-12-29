import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService'
import { ListCategoriesService } from '@modules/categories/services/ListCategoriesService'

export class CategoryController {
  public async index (request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService)
    const categories = await listCategoriesService.execute()

    return response.status(201).json(categories)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const createCategoryService = container.resolve(CreateCategoryService)
    const categories = await createCategoryService.execute({ name, description })

    return response.status(201).json(categories)
  }
}
