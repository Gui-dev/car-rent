import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO'
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository'
import { Category } from '../../model/Category'

export class CategoryRepositoryInMemory implements ICategoryRepository {
  public categories: Category[] = []

  public async listCategories (): Promise<Category[]> {
    const categories = this.categories
    return categories
  }

  public async create (data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()

    Object.assign(category, {
      name: data.name,
      description: data.description
    })

    this.categories.push(category)

    return category
  }

  public async findByName (name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)

    return category as Category
  }
}
