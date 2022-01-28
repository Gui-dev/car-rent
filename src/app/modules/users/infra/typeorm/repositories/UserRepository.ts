import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/typeorm/model/User'

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getRepository(User)
  }

  public async create ({ id, name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar
    })

    await this.userRepository.save(user)

    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email })

    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id)

    return user
  }
}
