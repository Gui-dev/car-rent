import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { User } from '@modules/users/infra/typeorm/model/User'

@Entity('users_token')
export class UserToken {
  @PrimaryColumn()
  public readonly id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  public readonly user_id: string

  @Column()
  public refresh_token: string

  @CreateDateColumn()
  public expires_date: Date

  @CreateDateColumn()
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
