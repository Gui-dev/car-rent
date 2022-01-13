import { CreateCarService } from '../CreateCarService'
import { CarRepositoryInMemory } from '@modules/cars/infra/typeorm/in-memory/CarRepositoryInMemory'
import { AppError } from '@shared/infra/error/AppError'

let createCarService: CreateCarService
let carRepositoryInMemory: CarRepositoryInMemory

describe('Create Car Service', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory()
    createCarService = new CreateCarService(carRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = {
      category_id: 'fake_category_id',
      name: 'fake_name',
      description: 'fake_description',
      daily_rate: 100,
      license_plate: 'fake_plate',
      fine_amount: 60,
      brand: 'fake_brand'
    }
    const response = await createCarService.execute(car)

    expect(response).toHaveProperty('id')
  })

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      const car = {
        category_id: 'fake_category_id',
        name: 'fake_name',
        description: 'fake_description',
        daily_rate: 100,
        license_plate: 'fake_plate',
        fine_amount: 60,
        brand: 'fake_brand'
      }

      const newCar = {
        category_id: 'fake_category_id_2',
        name: 'fake_name',
        description: 'fake_description',
        daily_rate: 100,
        license_plate: 'fake_plate',
        fine_amount: 60,
        brand: 'fake_brand'
      }

      await createCarService.execute(car)
      await createCarService.execute(newCar)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a car with available true by default', async () => {
    const car = {
      category_id: 'fake_category_id',
      name: 'fake_name',
      description: 'fake_description',
      daily_rate: 100,
      license_plate: 'fake_plate',
      fine_amount: 60,
      brand: 'fake_brand'
    }
    const response = await createCarService.execute(car)

    expect(response.available).toBe(true)
  })
})
