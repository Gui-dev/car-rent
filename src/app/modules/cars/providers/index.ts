import { container } from 'tsyringe'

import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository'

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'

container.registerSingleton<ICarRepository>('CarRepository', CarRepository)
container.registerSingleton<ICarImagesRepository>('CarImagesRepository', CarImagesRepository)
