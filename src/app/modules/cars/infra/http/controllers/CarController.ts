import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarService } from '@modules/cars/services/CreateCarService'
import { ListAvailablesCarsService } from '@modules/cars/services/ListAvailablesCarsService'

export class CarController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand } = request.query
    const listAvalilablesCarsService = container.resolve(ListAvailablesCarsService)
    const cars = await listAvalilablesCarsService.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string
    })

    return response.status(201).json(cars)
  }

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
