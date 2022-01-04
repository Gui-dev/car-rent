import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  @Exclude()
  public password: string

  @Column()
  public driver_license: string

  @Column()
  public admin: boolean

  @CreateDateColumn()
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
