import { injectable, inject } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/model/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { AppError } from '@shared/infra/error/AppError'
import { ICarRepository } from '../repositories/ICarRepository'

@injectable()
export class CreateCarService {
  constructor (
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  public async execute ({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand
  }: ICreateCarDTO): Promise<Car> {
    const carAleadyExists = await this.carRepository.findByLicensePlate(license_plate)

    if (carAleadyExists) {
      throw new AppError('Car already exists!', 400)
    }

    const car = await this.carRepository.create({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    })

    return car
  }
}
