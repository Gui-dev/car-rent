import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRentalsService } from '@modules/rentals/services/CreateRentalsService'

export class CreateRentalController {
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
