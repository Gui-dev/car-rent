import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarService } from '@modules/cars/services/CreateCarService'

export class CarController {
  public async create (request: Request, response: Response): Promise<Response> {
    const {
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    } = request.body

    const createCarService = container.resolve(CreateCarService)
    const car = await createCarService.execute({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    })

    return response.status(201).json(car)
  }
}
