import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO'
import { AppError } from '@shared/infra/error/AppError'
import { IUserRepository } from '../repositories/IUserRepository'
import { IBcryptHashProvider } from '../providers/hashProvider/models/IBcryptHashProvider'

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
    private userRepository: IUserRepository,
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

    const token = sign({}, 'minhachavesecreta', {
      subject: user.id,
      expiresIn: '1d'
    })

    if (!token) {
      throw new AppError('Error generating token', 400)
    }

    return {
      user,
      token
    }
  }
}
