import { container } from 'tsyringe'

import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository'

container.registerSingleton<ICarRepository>('CarRepository', CarRepository)
