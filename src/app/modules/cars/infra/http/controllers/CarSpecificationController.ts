import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarSpecificationService } from '@modules/cars/services/CreateCarSpecificationService'

export class CarSpecificationController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params
    const { specification_id } = request.body
    const createCarSpecificationService = container.resolve(CreateCarSpecificationService)

    const carSpecification = await createCarSpecificationService.execute({
      car_id,
      specification_id
    })
    return response.status(201).json(carSpecification)
  }
}
