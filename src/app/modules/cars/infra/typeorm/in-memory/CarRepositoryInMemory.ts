import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/model/Car'

export class CarRepositoryInMemory implements ICarRepository {
  public cars: Car[] = []

  public async create ({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    })

    this.cars.push(car)

    return car
  }

  public async findByLicensePlate (license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate)

    return car as Car
  }
}
