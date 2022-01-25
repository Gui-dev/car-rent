import { injectable, inject } from 'tsyringe'

import { IRentalsRepository } from '../repositories/IRentalsRepository'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { AppError } from '@shared/infra/error/AppError'
import { Rental } from '../infra/typeorm/model/Rental'

@injectable()
export class CreateRentalsService {
  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  public async execute ({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError('There\'s a rental in progress for user!')
    }

    const rentalCar = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rentalCar
  }
}
