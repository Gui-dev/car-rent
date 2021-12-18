import { Request, Response } from 'express'

import { ImportCategoryService } from '@modules/categories/services/ImportCategoryService'
import { CategoryRepository } from '../../typeorm/repositories/CategoryRepository'

export class ImportController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { file } = request
    const categoryRepository = CategoryRepository.getInstance()
    const importCategoryService = new ImportCategoryService(categoryRepository)
    const importCategory = await importCategoryService.execute({ file })

    return response.status(201).json(importCategory)
  }
}
