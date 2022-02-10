import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import { readFileSync } from 'fs'

import { IMailDTO } from '../dtos/IMailDTO'
import { IMailProvider } from '../models/IMailProvider'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor () {
    nodemailer.createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(err => console.log(err))
  }

  public async sendMail ({ to, subject, variables, path }: IMailDTO): Promise<void> {
    const templateFileContent = readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'Car rent <noreplay@carrent.com>',
      subject,
      html: templateHTML
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
