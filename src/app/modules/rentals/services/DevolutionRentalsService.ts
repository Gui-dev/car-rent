import { inject, injectable } from 'tsyringe'

import { Rental } from '../infra/typeorm/model/Rental'
import { IDevolutionRentalsDTO } from '../dtos/IDevolutionRentalsDTO'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { IRentalsRepository } from '../repositories/IRentalsRepository'
import { AppError } from '@shared/infra/error/AppError'
import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'

@injectable()
export class DevolutionRentalsService {
  private minimumDaily = 1
  private total = 0

  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider
  ) {}

  public async execute ({ rental_id }: IDevolutionRentalsDTO): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)

    if (!rental) {
      throw new AppError('Rental doesn\'t exists!')
    }

    const car = await this.carRepository.findById(rental.car_id)

    if (!car) {
      throw new AppError('Car doesn\'t exists!')
    }

    const dateNow = this.dayJSDateProvider.dateNow()
    let daily = this.dayJSDateProvider.compareInDays(
      rental.start_date,
      this.dayJSDateProvider.dateNow()
    )
    const delayInDays = this.dayJSDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    )

    if (daily <= 0) {
      daily = this.minimumDaily
    }

    if (delayInDays > 0) {
      const calculateFine = delayInDays * car.fine_amount
      this.total = calculateFine
    }

    this.total += daily * car.daily_rate
    rental.end_date = this.dayJSDateProvider.dateNow()
    rental.total = this.total

    await this.rentalsRepository.create(rental)
    await this.carRepository.updateAvailable(car.id, true)

    return rental
  }
}
