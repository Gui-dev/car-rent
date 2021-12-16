import { v4 as uuid } from 'uuid'

export class Specification {
  public id?: string
  public name: string
  public description: string
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}