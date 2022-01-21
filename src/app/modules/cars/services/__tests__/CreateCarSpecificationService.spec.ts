import { CreateCarSpecificationService } from '../CreateCarSpecificationService'
import { CarRepositoryInMemory } from '@modules/cars/infra/typeorm/in-memory/CarRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/specifications/infra/typeorm/repositories/in-memory/SpecificationsRepositoryInMemory'
import { AppError } from '@shared/infra/error/AppError'

let createCarSpecificationService: CreateCarSpecificationService
let carRepositoryInMemory: CarRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create Car Specification Service', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationService = new CreateCarSpecificationService(
      carRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      await createCarSpecificationService.execute({
        car_id: 'fake_car_id',
        specification_id: ['fake_specification_id']
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = {
      category_id: 'fake_category_id',
      name: 'fake_name',
      description: 'fake_description',
      daily_rate: 100,
      license_plate: 'fake_plate',
      fine_amount: 60,
      brand: 'fake_brand'
    }

    const specification = {
      name: 'fake_specification_name',
      description: 'fake_specification_description'
    }

    const responseCar = await carRepositoryInMemory.create(car)

    const responseSpecification = await specificationsRepositoryInMemory.create(specification)

    const createCarResponse = await createCarSpecificationService.execute({
      car_id: responseCar.id,
      specification_id: [responseSpecification.id]
    })

    expect(createCarResponse).toHaveProperty('specifications')
    expect(createCarResponse.specifications.length).toBe(1)
  })
})
