import { inject, injectable } from 'tsyringe'

import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { AppError } from '@shared/infra/error/AppError'
import { User } from '../infra/typeorm/model/User'
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider'

@injectable()
export class UpdateUserAvatarService {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute ({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 401)
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    await this.storageProvider.save(avatar_file, 'avatar')
    user.avatar = avatar_file
    await this.userRepository.create(user)

    return user
  }
}
