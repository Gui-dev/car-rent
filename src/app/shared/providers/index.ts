import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/DateProvider/models/IDateProvider'
import { DayJSDateProvider } from '@shared/providers/DateProvider/implementations/DayJSDateProvider'

container.registerSingleton<IDateProvider>('DayJSDateProvider', DayJSDateProvider)
