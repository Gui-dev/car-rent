import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { DayJSDateProvider } from '@shared/providers/DateProvider/implementations/DayJSDateProvider'

import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider'
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IDateProvider>('DayJSDateProvider', DayJSDateProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
