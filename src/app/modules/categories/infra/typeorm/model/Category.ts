import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('categories')
export class Category {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public readonly name: string

  @Column()
  public readonly description: string

  @CreateDateColumn()
  public readonly created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
