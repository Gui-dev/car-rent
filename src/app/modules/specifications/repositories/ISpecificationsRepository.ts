import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../infra/typeorm/model/Specification'

export interface ISpecificationsRepository {
  create (data: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(specification_ids: Array<string>): Promise<Specification[]>
}
