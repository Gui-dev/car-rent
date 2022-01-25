import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '../model/Rental'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentalsRepository: Rental[] = []
  public async create (data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      user_id: data.user_id,
      car_id: data.car_id,
      start_date: new Date(),
      expected_return_date: data.expected_return_date
    })

    this.rentalsRepository.push(rental)

    return rental
  }

  public async findOpenRentalByCar (car_id: string): Promise<Rental | undefined> {
    return this.rentalsRepository.find(rental => rental.car_id === car_id && rental.end_date === null)
  }

  public async findOpenRentalByUser (user_id: string): Promise<Rental | undefined> {
    return this.rentalsRepository.find(rental => rental.user_id === user_id && rental.end_date === null)
  }
}
