import { getRepository, Repository } from 'typeorm'

import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository'
import { Category } from '../model/Category'
import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO'
import { AppError } from '@shared/infra/error/AppError'

export class CategoryRepository implements ICategoryRepository {
  private categoryRepository: Repository<Category>

  constructor () {
    this.categoryRepository = getRepository(Category)
  }

  public async findByName (name: string): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOne({ name })

    if (category) {
      throw new AppError('Category already exists')
    }

    return category
  }

  public async listCategories (): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.find()

    return categories
  }

  public async create ({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
      description
    })
    await this.categoryRepository.save(category)

    return category
  }
}
