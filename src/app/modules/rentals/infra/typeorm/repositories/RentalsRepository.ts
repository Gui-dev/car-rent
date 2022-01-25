import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '../model/Rental'

export class RentalsRepository implements IRentalsRepository {
  public async create (data: ICreateRentalDTO): Promise<Rental> {
    throw new Error('Method not implemented.')
  }
  public async findOpenRentalByCar (car_id: string): Promise<Rental> {
    throw new Error('Method not implemented.')
  }
  public async findOpenRentalByUser (user_id: string): Promise<Rental> {
    throw new Error('Method not implemented.')
  }
}
