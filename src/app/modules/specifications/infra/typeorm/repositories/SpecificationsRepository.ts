import { getRepository, Repository } from 'typeorm'

import { ISpecificationsRepository } from '@modules/specifications/repositories/ISpecificationsRepository'
import { Specification } from '../model/Specification'
import { ICreateSpecificationDTO } from '@modules/specifications/dtos/ICreateSpecificationDTO'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specificationRepository: Repository<Specification>

  constructor () {
    this.specificationRepository = getRepository(Specification)
  }

  public async create ({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationRepository.create({
      name,
      description
    })

    await this.specificationRepository.save(specification)

    return specification
  }

  public async findByName (name: string): Promise<Specification> {
    const specification = await this.specificationRepository.findOne({ name })

    return specification as Specification
  }

  public async findByIds (specification_ids: string[]): Promise<Specification[]> {
    const specifications = await this.specificationRepository.findByIds(specification_ids)

    return specifications
  }
}
