import { Request, Response } from 'express'

import { CreateSpecificationService } from '@modules/specifications/services/CreateSpecificationService'
import { SpecificationsRepository } from '../../typeorm/repositories/SpecificationsRepository'

export class SpecificationController {
  // constructor (private createSpecificationService: CreateSpecificationService) {}

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const specificationsRepository = new SpecificationsRepository()
    const createSpecificationService = new CreateSpecificationService(specificationsRepository)
    const specification = await createSpecificationService.execute({ name, description })

    return response.status(201).json(specification)
  }
}
