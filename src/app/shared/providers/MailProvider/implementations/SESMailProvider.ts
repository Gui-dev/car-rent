import { SES } from 'aws-sdk'
import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import { readFileSync } from 'fs'

import { IMailDTO } from '../dtos/IMailDTO'
import { IMailProvider } from '../models/IMailProvider'

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor () {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_BUCKET_REGION
      })
    })
  }

  public async sendMail ({ to, subject, variables, path }: IMailDTO): Promise<void> {
    const templateFileContent = readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      from: `Car rent ${process.env.AWS_EMAIL_VALID}`,
      subject,
      html: templateHTML
    })
  }
}
