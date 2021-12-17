import { Request, Response } from 'express'

import { ImportCategoryService } from '@modules/categories/services/ImportCategoryService'

export class ImportController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { file } = request
    const importCategoryService = new ImportCategoryService()
    const importCategory = importCategoryService.execute({ file })

    return response.status(201).json(importCategory)
  }
}
