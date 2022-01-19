import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO'
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
    brand,
    specifications
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

  public async findByLicensePlate (license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate)

    return car
  }

  public async findAllAvailablesCars ({ category_id, name, brand }: IListCarsDTO): Promise<Car[]> {
    const cars = this.cars
      .filter(car => {
        if (
          (car.available === true) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name) ||
          (brand && car.brand === brand)
        ) {
          return car
        }

        return null
      })

    return cars
  }

  public async findById (car_id: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.id === car_id)
    return car
  }
}
