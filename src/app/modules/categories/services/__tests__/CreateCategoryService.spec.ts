import 'reflect-metadata'
// import { AppError } from '@shared/infra/error/AppError'
import { CreateCategoryService } from '@modules/categories/services/CreateCategoryService'
import { CategoryRepositoryInMemory } from '@modules/categories/infra/typeorm/repositories/in-memory/CategoryRepositoryInMemory'
// import { Category } from '@modules/categories/infra/typeorm/model/Category'

let createCategoryService: CreateCategoryService
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryService = new CreateCategoryService(categoryRepositoryInMemory)
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Description Test'
    }

    const categoryResult = await createCategoryService.execute(category)

    expect(categoryResult).toHaveProperty('id')
  })
})
