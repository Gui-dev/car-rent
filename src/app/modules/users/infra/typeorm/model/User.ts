import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Exclude, Expose } from 'class-transformer'

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
  @Expose()
  public admin: boolean

  @Column()
  public avatar: string

  @CreateDateColumn()
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
