import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DevolutionRentalsService } from '@modules/rentals/services/DevolutionRentalsService'

export class DevolutionRentalController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params
    const devolutionRentalsService = container.resolve(DevolutionRentalsService)
    const rental = await devolutionRentalsService.execute({ rental_id })

    return response.status(201).json(rental)
  }
}
