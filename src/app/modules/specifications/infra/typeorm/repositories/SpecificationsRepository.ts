import { ISpecificationsRepository } from '@modules/specifications/repositories/ISpecificationsRepository'
import { Specification } from '../model/Specification'
import { ICreateSpecificationDTO } from '@modules/specifications/dtos/ICreateSpecificationDTO'
import { AppError } from '@shared/infra/error/AppError'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor () {
    this.specifications = []
  }

  public async create ({ name, description }: ICreateSpecificationDTO): Promise<Specification[]> {
    const specification: Specification = {
      name,
      description,
      created_at: new Date()
    }

    this.specifications.push(specification)

    return this.specifications
  }

  public async findByName (name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name)

    if (!specification) {
      throw new AppError('Specification not found', 404)
    }

    return specification
  }
}
