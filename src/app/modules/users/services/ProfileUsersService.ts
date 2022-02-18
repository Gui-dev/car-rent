import { AppError } from '@shared/infra/error/AppError'
import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/model/User'
import { IUserRepository } from '../repositories/IUserRepository'

@injectable()
export class ProfileUsersService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute (user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User doesn\'t exists')
    }

    return user
  }
}
