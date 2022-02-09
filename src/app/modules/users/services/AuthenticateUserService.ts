import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import { authConfig } from '@config/auth'
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO'
import { AppError } from '@shared/infra/error/AppError'
import { IUserRepository } from '../repositories/IUserRepository'
import { IBcryptHashProvider } from '../providers/hashProvider/models/IBcryptHashProvider'
import { IUsersTokenRepository } from '../repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'

type User = {
  id: string
  name: string
  email: string
  driver_license: string
  admin: boolean
  created_at: Date
}

type IResponse = {
  user: User
  token: string
  refresh_token: string
}

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider,
    @inject('BcryptHashProvider')
    private bcryptHashProvider: IBcryptHashProvider
  ) {}

  public async execute ({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail or password incorrect', 401)
    }

    const passwordMatch = await this.bcryptHashProvider.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail or password incorrect', 401)
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn
    })

    if (!token) {
      throw new AppError('Error generating token', 400)
    }

    const refresh_token = sign({ email }, authConfig.refresh_token, {
      subject: user.id,
      expiresIn: authConfig.refreshTokenExpiresIn
    })

    const expiresRefreshTokenDays = this.dayJSDateProvider.addDays(authConfig.expiresRefreshTokenDays)

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: expiresRefreshTokenDays
    })

    return {
      user,
      token,
      refresh_token
    }
  }
}
