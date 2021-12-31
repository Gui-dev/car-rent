import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/typeorm/model/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { BcryptHashProvider } from '@modules/users/providers/hashProvider/implementations/BcryptHasProvider'
import { AppError } from '@shared/infra/error/AppError'

@injectable()
export class CreateUserServices {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('BcryptHashProvider')
    private hashProvider: BcryptHashProvider
  ) {}

  public async execute ({ name, email, password, driver_license }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHashed = await this.hashProvider.generateHash(password)
    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      driver_license
    })

    return user
  }
}
