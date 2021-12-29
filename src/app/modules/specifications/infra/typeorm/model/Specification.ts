import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('specifications')
export class Specification {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public description: string

  @CreateDateColumn()
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
