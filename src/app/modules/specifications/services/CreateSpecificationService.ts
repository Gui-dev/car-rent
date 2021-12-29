import { inject, injectable } from 'tsyringe'

import { Specification } from '../infra/typeorm/model/Specification'
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository'
import { AppError } from '@shared/infra/error/AppError'

type IRequest = {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationService {
  constructor (
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  public async execute ({ name, description }: IRequest): Promise<Specification[]> {
    const specificationAlreadyExists = this.specificationRepository.findByName(name)

    if (!specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    const specification = await this.specificationRepository.create({ name, description })

    return specification
  }
}
