import { Category } from '../infra/typeorm/model/Category'
import { CategoryRepository } from '../infra/typeorm/repositories/CategoryRepository'

export class ListCategoriesService {
  constructor (private categoriesRepository: CategoryRepository) {}

  public async execute (): Promise<Category[]> {
    const categories = this.categoriesRepository.listCategories()

    return categories
  }
}
