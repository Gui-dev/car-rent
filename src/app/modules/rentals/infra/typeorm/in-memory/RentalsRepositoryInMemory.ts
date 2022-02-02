import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '../model/Rental'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentalsRepository: Rental[] = []

  public async create (data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      id: data.id,
      user_id: data.user_id,
      car_id: data.car_id,
      start_date: new Date(),
      end_date: data.end_date,
      expected_return_date: data.expected_return_date,
      total: data.total
    })

    this.rentalsRepository.push(rental)

    return rental
  }

  public async findOpenRentalByCar (car_id: string): Promise<Rental | undefined> {
    return this.rentalsRepository.find(rental => rental.car_id === car_id && !rental.end_date)
  }

  public async findOpenRentalByUser (user_id: string): Promise<Rental | undefined> {
    return this.rentalsRepository.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  public async findById (rental_id: string): Promise<Rental | undefined> {
    return this.rentalsRepository.find(rental => rental.car_id === rental_id)
  }

  public async findByUserId (user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.filter(rental => rental.user_id === user_id)
  }
}
