import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/infra/error/AppError'
import { CreateRentalsService } from '../CreateRentalsService'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalsService: CreateRentalsService

describe('Create Rental Service', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalsService = new CreateRentalsService(rentalsRepositoryInMemory)
  })
  it('should be able to create a new rental', async () => {
    const rental = await createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: 'fake_car_id',
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there\'s another open to the same user', () => {
    expect(async () => {
      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: new Date()
      })

      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id_2',
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
