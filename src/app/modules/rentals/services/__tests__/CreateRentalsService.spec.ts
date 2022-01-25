import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/in-memory/RentalsRepositoryInMemory'
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
})
