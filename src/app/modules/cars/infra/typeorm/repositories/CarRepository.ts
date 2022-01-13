import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { Car } from '../model/Car'

export class CarRepository implements ICarRepository {
  public async create (data: ICreateCarDTO): Promise<Car> {
    throw new Error('Method not implemented.')
  }
}
