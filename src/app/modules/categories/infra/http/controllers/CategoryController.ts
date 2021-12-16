import { Request, Response } from 'express'

import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService'
import { ListCategoriesService } from '@modules/categories/services/ListCategoriesService'
import { CategoryRepository } from '../../typeorm/repositories/CategoryRepository'

export class CategoryController {
  // constructor (
  //   private createCategoryService: CreateCategoryService,
  //   private listCategoriesService: ListCategoriesService
  // ) {}

  public async index (request: Request, response: Response): Promise<Response> {
    const categoriesRepository = CategoryRepository.getInstance()
    const listCategoriesService = new ListCategoriesService(categoriesRepository)
    const categories = await listCategoriesService.execute()

    return response.status(201).json(categories)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const categoriesRepository = CategoryRepository.getInstance()
    const createCategoryService = new CreateCategoryService(categoriesRepository)
    const categories = await createCategoryService.execute({ name, description })

    return response.status(201).json(categories)
  }
}
