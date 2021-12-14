import { v4 as uuid } from 'uuid'

export class Category {
  public readonly id?: string
  public readonly name: string
  public readonly description: string
  public readonly created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
