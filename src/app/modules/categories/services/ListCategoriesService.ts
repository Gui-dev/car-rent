import { inject, injectable } from 'tsyringe'

import { Category } from '../infra/typeorm/model/Category'
import { CategoryRepository } from '../infra/typeorm/repositories/CategoryRepository'

@injectable()
export class ListCategoriesService {
  constructor (
    @inject('CategoryRepository')
    private categoriesRepository: CategoryRepository
  ) {}

  public async execute (): Promise<Category[] | undefined> {
    const categories = await this.categoriesRepository.listCategories()

    return categories
  }
}
