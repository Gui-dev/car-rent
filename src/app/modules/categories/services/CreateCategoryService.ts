import { AppError } from '@shared/infra/error/AppError'
import { Category } from '@modules/categories/infra/typeorm/model/Category'
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryService {
  constructor (private categoriesRepository: ICategoryRepository) {}

  public async execute ({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    const category = await this.categoriesRepository.create({ name, description })

    return category
  }
}
