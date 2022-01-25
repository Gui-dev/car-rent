import { v4 as uuid } from 'uuid'

export class Rental {
  public id: string
  public user_id: string
  public car_id: string
  public start_date: Date
  public end_date: Date
  public expected_return_date: Date
  public total: number
  public created_at: Date
  public updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
      // this.start_date = new Date()
      // this.end_date = new Date()
      // this.expected_return_date = new Date()
      // this.created_at = new Date()
      // this.updated_at = new Date()
    }
  }
}
