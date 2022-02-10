import { IMailDTO } from '../dtos/IMailDTO'

export interface IMailProvider {
  sendMail (data: IMailDTO): Promise<void>
}
