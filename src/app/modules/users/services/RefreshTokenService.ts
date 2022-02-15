import { inject, injectable } from 'tsyringe'
import { verify, sign } from 'jsonwebtoken'

import { IUsersTokenRepository } from '../repositories/IUsersTokenRepository'
import { authConfig } from '@config/auth'
import { AppError } from '@shared/infra/error/AppError'
import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { UserToken } from '../infra/typeorm/model/UserToken'

type IRefreshTokenServiceResponse = {
  token: string
  refresh_token: UserToken
}

type IPayload = {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenService {
  constructor (
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider
  ) {}

  public async execute (refresh_token: string): Promise<IRefreshTokenServiceResponse> {
    const { email, sub } = verify(refresh_token, authConfig.refresh_token) as IPayload
    const userId = sub
    const userTokens = await this.usersTokenRepository.findByUserIdAndRefreshToken(userId, refresh_token)

    if (!userTokens) {
      throw new AppError('Refresh token doesn\'t exists')
    }

    await this.usersTokenRepository.deleteById(userTokens.id)

    const newRefreshToken = sign({ email }, authConfig.refresh_token, {
      subject: sub,
      expiresIn: authConfig.refreshTokenExpiresIn
    })

    const expiresRefreshTokenDays = this.dayJSDateProvider.addDays(authConfig.expiresRefreshTokenDays)

    const refreshToken = await this.usersTokenRepository.create({
      user_id: sub,
      refresh_token: newRefreshToken,
      expires_date: expiresRefreshTokenDays
    })

    const newToken = sign({}, authConfig.secret, {
      subject: userId,
      expiresIn: authConfig.expiresIn
    })

    return {
      token: newToken,
      refresh_token: refreshToken
    }
  }
}
