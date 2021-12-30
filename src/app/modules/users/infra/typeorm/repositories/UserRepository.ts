import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/typeorm/model/User'

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getRepository(User)
  }

  public async create ({ name, email, password, driver_license }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
      driver_license
    })

    await this.userRepository.save(user)

    return user
  }
}
