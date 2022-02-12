import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider'
import { IMailDTO } from '../dtos/IMailDTO'

export class EtherealMailProviderInMemory implements IMailProvider {
  private messages: IMailDTO[] = []
  public async sendMail (data: IMailDTO): Promise<void> {
    this.messages.push(data)
  }
}
