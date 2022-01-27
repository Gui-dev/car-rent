import { container } from 'tsyringe'

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'

import { IDateProvider } from '@modules/rentals/providers/DateProvider/models/IDateProvider'
import { DayJSDateProvider } from '@modules/rentals/providers/DateProvider/implementations/DayJSDateProvider'

container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)
container.registerSingleton<IDateProvider>('DayJSDateProvider', DayJSDateProvider)
