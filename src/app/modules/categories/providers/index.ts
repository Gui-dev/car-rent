import { container } from 'tsyringe'

import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository'
import { CategoryRepository } from '@modules/categories/infra/typeorm/repositories/CategoryRepository'

container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository)
