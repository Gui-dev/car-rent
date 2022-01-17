import { inject, injectable } from 'tsyringe'

import { ICarRepository } from '../repositories/ICarRepository'
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO'

@injectable()
export class ListCarsService {
  constructor (
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  public async execute ({ category_id, name, brand }: IListCarsDTO) {
    const cars = await this.carRepository.findAllAvailablesCars({ category_id, name, brand })

    return cars
  }
}
