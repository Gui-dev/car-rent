import { Car } from '@modules/cars/infra/typeorm/model/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IListCarsDTO } from '../dtos/IListCarsDTO'

export interface ICarRepository {
  create (data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
  findAllAvailablesCars(data: IListCarsDTO): Promise<Car[]>
  findById(car_id: string): Promise<Car | undefined>
}
