import { inject, injectable } from 'tsyringe'

import { IResetPasswordDTO } from '../dtos/IResetPasswordDTO'
import { IUsersTokenRepository } from '../repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { AppError } from '@shared/infra/error/AppError'
import { IUserRepository } from '../repositories/IUserRepository'
import { IBcryptHashProvider } from '../providers/hashProvider/models/IBcryptHashProvider'

@injectable()
export class ResetPasswordService {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IBcryptHashProvider,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider
  ) {}

  public async execute ({ token, password }: IResetPasswordDTO): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (this.dayJSDateProvider.compareIfBefore(userToken.expires_date, this.dayJSDateProvider.dateNow())) {
      throw new AppError('Token expired!')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User doesn\'t exists')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.userRepository.create(user)
    await this.usersTokenRepository.deleteById(userToken.id)
  }
}
