import { container } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/specifications/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/specifications/infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository)
