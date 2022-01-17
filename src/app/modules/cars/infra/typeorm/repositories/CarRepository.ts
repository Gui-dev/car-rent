import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { Car } from '../model/Car'

export class CarRepository implements ICarRepository {
  private repositoryCar: Repository<Car>

  constructor () {
    this.repositoryCar = getRepository(Car)
  }

  public async create (data: ICreateCarDTO): Promise<Car> {
    const car = this.repositoryCar.create(data)
    await this.repositoryCar.save(car)

    return car
  }

  public async findByLicensePlate (license_plate: string): Promise<Car | undefined> {
    const car = await this.repositoryCar.findOne({ license_plate })

    return car
  }

  public async findAllAvailablesCars (): Promise<Car[]> {
    throw new Error('Method not implemented.')
  }
}
