import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '../model/Rental'

export class RentalsRepository implements IRentalsRepository {
  private rentalsRepository: Repository<Rental>

  constructor () {
    this.rentalsRepository = getRepository(Rental)
  }

  public async create (data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create(data)
    await this.rentalsRepository.save(rental)

    return rental
  }
  public async findOpenRentalByCar (car_id: string): Promise<Rental | undefined> {
    const openByCar = await this.rentalsRepository.findOne({ car_id })

    return openByCar
  }
  public async findOpenRentalByUser (user_id: string): Promise<Rental | undefined> {
    const openByUser = await this.rentalsRepository.findOne({ user_id })

    return openByUser
  }
}
