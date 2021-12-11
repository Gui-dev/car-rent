import { AppError } from '@shared/infra/error/AppError'
import { Category } from '../typeorm/model/Category'
import { CategoryRepository } from '../typeorm/repositories/CategoryRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryService {
  constructor (private categoriesRepository: CategoryRepository) {}

  public async execute ({ name, description }: IRequest): Promise<Category[]> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    const categories = await this.categoriesRepository.create({ name, description })

    return categories
  }
}
