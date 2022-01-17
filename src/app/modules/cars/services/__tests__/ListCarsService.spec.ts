import { CarRepositoryInMemory } from '@modules/cars/infra/typeorm/in-memory/CarRepositoryInMemory'
import { ListCarsService } from '../ListCarsService'

let listCarsService: ListCarsService
let carRepositoryInMemory: CarRepositoryInMemory

describe('List cars Service', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory()
    listCarsService = new ListCarsService(carRepositoryInMemory)
  })

  it('should be able to list all availables cars', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_id',
      name: 'fake_car',
      description: 'fake_description',
      daily_rate: 140.00,
      license_plate: 'fake_license_plate',
      fine_amount: 160.00,
      brand: 'fake_brand'
    })

    const cars = await listCarsService.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all availables cars by brand', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_id',
      name: 'fake_car',
      description: 'fake_description',
      daily_rate: 140.00,
      license_plate: 'fake_license_plate',
      fine_amount: 160.00,
      brand: 'fake_brand'
    })

    const cars = await listCarsService.execute({
      brand: 'fake_brand'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all availables cars by name', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_id',
      name: 'fake_car',
      description: 'fake_description',
      daily_rate: 140.00,
      license_plate: 'fake_license_plate',
      fine_amount: 160.00,
      brand: 'fake_brand'
    })

    const cars = await listCarsService.execute({
      name: 'fake_car'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all availables cars by category', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_id',
      name: 'fake_car',
      description: 'fake_description',
      daily_rate: 140.00,
      license_plate: 'fake_license_plate',
      fine_amount: 160.00,
      brand: 'fake_brand'
    })

    const cars = await listCarsService.execute({
      category_id: 'fake_id'
    })

    expect(cars).toEqual([car])
  })
})
