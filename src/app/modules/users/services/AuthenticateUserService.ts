import { inject, injectable } from 'tsyringe'

import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/infra/error/AppError'
import { BcryptHashProvider } from '../providers/hashProvider/implementations/BcryptHasProvider'
import { JsonWebTokenProvider } from '../providers/jwt/implementations/JsonWebTokenProvider'

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
}

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('BcryptHashProvider')
    private bcryptHashProvider: BcryptHashProvider,
    @inject('JsonWebTokenProvider')
    private jsonWebTokenProvider: JsonWebTokenProvider
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

    const token = await this.jsonWebTokenProvider.generate(user.id)

    if (!token) {
      throw new AppError('Error generating token', 400)
    }

    return {
      user,
      token
    }
  }
}
