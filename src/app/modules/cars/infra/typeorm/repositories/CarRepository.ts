import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { Car } from '../model/Car'
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO'

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

  public async findAllAvailablesCars (data: IListCarsDTO): Promise<Car[]> {
    const { category_id, name, brand } = data
    const carsQuery = this.repositoryCar.createQueryBuilder('car')
      .where('available = :available', { available: true })

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id })
    }

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  public async findById (car_id: string): Promise<Car | undefined> {
    const car = await this.repositoryCar.findOne(car_id)

    return car
  }

  public async updateAvailable (car_id: string, available: boolean): Promise<void> {
    await this.repositoryCar.createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :car_id')
      .setParameters({ car_id })
      .execute()
  }
}
