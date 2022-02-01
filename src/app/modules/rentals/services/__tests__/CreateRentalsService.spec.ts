import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/infra/error/AppError'
import { CreateRentalsService } from '../CreateRentalsService'
import { CarRepositoryInMemory } from '@modules/cars/infra/typeorm/in-memory/CarRepositoryInMemory'
import { DayJSDateProvider } from '@modules/rentals/providers/DateProvider/implementations/DayJSDateProvider'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carRepositoryInMemory: CarRepositoryInMemory
let dayJSDateProvider: DayJSDateProvider
let createRentalsService: CreateRentalsService

describe('Create Rental Service', () => {
  const dayAddTwentyFourHours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carRepositoryInMemory = new CarRepositoryInMemory()
    dayJSDateProvider = new DayJSDateProvider()
    createRentalsService = new CreateRentalsService(
      rentalsRepositoryInMemory,
      carRepositoryInMemory,
      dayJSDateProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: 'fake_car_id',
      expected_return_date: dayAddTwentyFourHours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there\'s another open to the same user', () => {
    expect(async () => {
      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: dayAddTwentyFourHours
      })

      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'another_fake_car_id',
        expected_return_date: dayAddTwentyFourHours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there\'s another open to the same car', () => {
    expect(async () => {
      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: dayAddTwentyFourHours
      })

      await createRentalsService.execute({
        user_id: 'another_fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: dayAddTwentyFourHours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalsService.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: dayjs().toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
