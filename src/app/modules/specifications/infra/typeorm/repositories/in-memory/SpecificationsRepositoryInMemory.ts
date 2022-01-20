import { ICreateSpecificationDTO } from '@modules/specifications/dtos/ICreateSpecificationDTO'
import { ISpecificationsRepository } from '@modules/specifications/repositories/ISpecificationsRepository'
import { Specification } from '../../model/Specification'

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  public specifications: Specification[] = []

  public async create (data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, data)
    this.specifications.push(specification)

    return specification
  }
  public async findByName (name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name)

    return specification as Specification
  }
  public async findByIds (specification_ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(
      specification => specification_ids.includes(specification.id)
    )

    return specifications as Specification[]
  }
}
