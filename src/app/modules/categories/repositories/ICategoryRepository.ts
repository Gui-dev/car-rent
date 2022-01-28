import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../infra/typeorm/model/Category'

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>
  listCategories(): Promise<Category[] | undefined>
  findByName(name: string): Promise<Category | undefined>
}
