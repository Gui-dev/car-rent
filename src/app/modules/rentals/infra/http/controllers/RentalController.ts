import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRentalsService } from '@modules/rentals/services/CreateRentalsService'
import { ListRentalsService } from '@modules/rentals/services/ListRentalsService'

export class RentalController {
  public async index (request: Request, response: Response): Promise<Response> {
    const user_id = request.userId
    const listRentalsService = container.resolve(ListRentalsService)
    const rentals = await listRentalsService.execute(user_id)

    return response.status(201).json(rentals)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.userId
    const { car_id } = request.params
    const { expected_return_date } = request.body
    const createRentalsService = container.resolve(CreateRentalsService)
    const rental = await createRentalsService.execute({
      user_id,
      car_id,
      expected_return_date
    })

    return response.status(201).json(rental)
  }
}
