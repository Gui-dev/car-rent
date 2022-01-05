import { NextFunction, Request, Response } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

import { AppError } from '@shared/infra/error/AppError'

type IPayload = JwtPayload & {
  iat: string
  exp: string
  sub: string
}

export const ensureAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, 'minhachavesecreta')
    const { sub } = decoded as IPayload

    request.userId = sub

    return next()
  } catch {
    throw new AppError('Invalid Token', 401)
  }
}
