import { injectable, inject } from 'tsyringe'

import { IRentalsRepository } from '../repositories/IRentalsRepository'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { AppError } from '@shared/infra/error/AppError'
import { Rental } from '../infra/typeorm/model/Rental'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { IDateProvider } from '../providers/DateProvider/models/IDateProvider'

@injectable()
export class CreateRentalsService {
  public minimumHour = 24 // Twenty Four hours

  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider
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

    const dateNow = this.dayJSDateProvider.dateNow()
    const compareDate = this.dayJSDateProvider.compareInHours(dateNow, expected_return_date)

    if (compareDate < this.minimumHour) {
      throw new AppError('Invalid return time!')
    }

    const rentalCar = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carRepository.updateAvailable(car_id, false)

    return rentalCar
  }
}
