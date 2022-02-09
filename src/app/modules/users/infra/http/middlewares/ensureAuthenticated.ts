import { NextFunction, Request, Response } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

import { authConfig } from '@config/auth'
import { AppError } from '@shared/infra/error/AppError'
import { UsersTokenRepository } from '../../typeorm/repositories/UsersTokenRepository'

type IPayload = JwtPayload & {
  iat: string
  exp: string
  sub: string
}

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization
  const usersTokenRepository = new UsersTokenRepository()

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.refresh_token)
    const { sub } = decoded as IPayload
    const user = await usersTokenRepository.findByUserIdAndRefreshToken(sub, token)

    if (!user) {
      throw new AppError('User doesn\'t exists', 401)
    }

    request.userId = user.user_id

    return next()
  } catch {
    throw new AppError('Invalid Token', 401)
  }
}
