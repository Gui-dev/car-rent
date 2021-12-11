import { v4 as uuid } from 'uuid'

import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository'
import { Category } from '../model/Category'

export class CategoryRepository implements ICategoryRepository {
  private categories: Category[]

  constructor () {
    this.categories = []
  }

  public async findByName (name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)

    if (!category) {
      return category
    }

    throw new Error('Category already exists')
  }

  public async listCategories (): Promise<Category[]> {
    return this.categories
  }

  public async create ({ name, description }): Promise<Category[]> {
    const category: Category = {
      id: uuid(),
      name,
      description,
      created_at: new Date()
    }

    this.categories.push(category)

    return this.categories
  }
}
