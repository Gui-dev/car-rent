import { Request, Response, NextFunction } from 'express'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/infra/error/AppError'

export const ensureAdmin = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const user_id = request.userId
  const userRepository = new UserRepository()
  const user = await userRepository.findById(user_id)

  if (!user.admin) {
    throw new AppError('User isn\'t admin', 401)
  }

  return next()
}
