import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'
import { resolve } from 'path'

import { IUserRepository } from '../repositories/IUserRepository'
import { IUsersTokenRepository } from '../repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { AppError } from '@shared/infra/error/AppError'
import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider'

@injectable()
export class SendForgotPasswordService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayJSDateProvider')
    private dayJSDateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute (email: string) {
    const user = await this.usersRepository.findByEmail(email)
    const templatePath = resolve(
      __dirname, '..', '..', '..', 'shared', 'providers', 'MailProvider', 'views', 'emails', 'forgot-password.hbs'
    )

    if (!user) {
      throw new AppError('User doesn\'t exists')
    }

    const token = uuid()
    const expiresDate = this.dayJSDateProvider.addHours(3)
    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: expiresDate
    })

    const variables = {
      name: user.name,
      link: `${process.env.RESET_PASSWORD_URL}${token}`
    }

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação se Senha',
      variables,
      path: templatePath
    })
  }
}
