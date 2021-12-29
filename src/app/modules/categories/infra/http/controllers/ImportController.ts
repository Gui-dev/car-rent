import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoryService } from '@modules/categories/services/ImportCategoryService'

export class ImportController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { file } = request
    const importCategoryService = container.resolve(ImportCategoryService)
    const importCategory = await importCategoryService.execute({ file })

    return response.status(201).json(importCategory)
  }
}
