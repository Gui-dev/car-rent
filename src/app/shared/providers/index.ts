import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { DayJSDateProvider } from '@shared/providers/DateProvider/implementations/DayJSDateProvider'

import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider'
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider'

import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider'
import { LocalStorageProvider } from '@shared/providers/StorageProvider/implementations/LocalStorageProvider'
import { AwsS3StorageProvider } from '@shared/providers/StorageProvider/implementations/AwsS3StorageProvider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: AwsS3StorageProvider
}

container.registerSingleton<IDateProvider>('DayJSDateProvider', DayJSDateProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
container.registerSingleton<IStorageProvider>('StorageProvider',
  process.env.APP_STATUS === 'development' ? diskStorage.local : diskStorage.s3
)
