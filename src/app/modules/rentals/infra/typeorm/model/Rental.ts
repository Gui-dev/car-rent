import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Car } from '@modules/cars/infra/typeorm/model/Car'

@Entity('rentals')
export class Rental {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public user_id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  public car: Car

  @Column()
  public car_id: string

  @Column()
  public start_date: Date

  @Column()
  public end_date: Date

  @Column()
  public expected_return_date: Date

  @Column()
  public total: number

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
