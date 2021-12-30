import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/typeorm/model/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

@injectable()
export class CreateUserServices {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute ({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license
    })

    return user
  }
}
