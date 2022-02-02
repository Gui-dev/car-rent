import { inject, injectable } from 'tsyringe'

import { IRentalsRepository } from '../repositories/IRentalsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/model/Rental'

@injectable()
export class ListRentalsService {
  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  public async execute (user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id)

    return rentalsByUser
  }
}
