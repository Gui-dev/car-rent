import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../models/IDateProvider'

dayjs.extend(utc)

export class DayJSDateProvider implements IDateProvider {
  public compareInHours (start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date)
    const endDateUTC = this.convertToUTC(end_date)
    const compareDate = dayjs(endDateUTC).diff(startDateUTC, 'hours')

    return compareDate
  }

  public convertToUTC (date: Date): string {
    const toUTC = dayjs(date).utc().local().format()

    return toUTC
  }

  public dateNow (): Date {
    return dayjs().toDate()
  }
}
