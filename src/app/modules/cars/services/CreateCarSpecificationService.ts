import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/infra/error/AppError'
import { ICreateCarSpecificationDTO } from '../dtos/ICreateCarSpecificationDTO'
import { ICarRepository } from '../repositories/ICarRepository'
import { ISpecificationsRepository } from '@modules/specifications/repositories/ISpecificationsRepository'
import { Car } from '../infra/typeorm/model/Car'

@injectable()
export class CreateCarSpecificationService {
  constructor (
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  public async execute ({ car_id, specification_id }: ICreateCarSpecificationDTO): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car doesn\'t exists!')
    }

    const specifications = await this.specificationsRepository.findByIds(specification_id)

    carExists.specifications = specifications

    await this.carRepository.create(carExists)

    return carExists
  }
}
