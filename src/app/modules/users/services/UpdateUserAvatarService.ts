import { inject, injectable } from 'tsyringe'

import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { AppError } from '@shared/infra/error/AppError'
import { User } from '../infra/typeorm/model/User'
import { deleteFile } from '@shared/utils/file'

@injectable()
export class UpdateUserAvatarService {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute ({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 401)
    }

    if (user.avatar) {
      await deleteFile('avatar', user.avatar)
    }

    user.avatar = avatar_file
    await this.userRepository.create(user)

    return user
  }
}
