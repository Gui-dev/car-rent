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
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_category_id',
      name: 'fake_car_name',
      description: 'fake_car_description',
      daily_rate: 60,
      license_plate: 'fake_license_plate',
      fine_amount: 120,
      brand: 'fake_car_brand'
    })

    const rental = await createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: car.id,
      expected_return_date: dayAddTwentyFourHours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there\'s another open to the same user', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_category_id',
      name: 'fake_car_name',
      description: 'fake_car_description',
      daily_rate: 60,
      license_plate: 'fake_license_plate',
      fine_amount: 120,
      brand: 'fake_car_brand'
    })

    await createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: car.id,
      expected_return_date: dayAddTwentyFourHours
    })

    expect(createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: 'another_fake_car_id',
      expected_return_date: dayAddTwentyFourHours
    })
    ).rejects.toEqual(new AppError('There\'s a rental in progress for user!'))
  })

  it('should not be able to create a new rental if there\'s another open to the same car', async () => {
    const car = await carRepositoryInMemory.create({
      category_id: 'fake_category_id',
      name: 'fake_car_name',
      description: 'fake_car_description',
      daily_rate: 60,
      license_plate: 'fake_license_plate',
      fine_amount: 120,
      brand: 'fake_car_brand'
    })

    await createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: car.id,
      expected_return_date: dayAddTwentyFourHours
    })

    await expect(createRentalsService.execute({
      user_id: 'another_fake_user_id',
      car_id: car.id,
      expected_return_date: dayAddTwentyFourHours
    })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalsService.execute({
      user_id: 'fake_user_id',
      car_id: 'fake_car_id',
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError('Invalid return time!'))
  })
})
