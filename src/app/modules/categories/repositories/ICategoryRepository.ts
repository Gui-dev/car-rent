import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../infra/typeorm/model/Category'

export interface ICategoryRepository {
  listCategories(): Promise<Category[]>
  create(data: ICreateCategoryDTO): Promise<Category[]>
  findByName(name: string): Promise<Category>
}
