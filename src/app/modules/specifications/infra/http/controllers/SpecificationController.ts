import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationService } from '@modules/specifications/services/CreateSpecificationService'

export class SpecificationController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const createSpecificationService = container.resolve(CreateSpecificationService)
    const specification = await createSpecificationService.execute({ name, description })

    return response.status(201).json(specification)
  }
}
