import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('car_images')
export class CarImage {
  @PrimaryColumn()
  public id: string

  @Column()
  public car_id: string

  @Column()
  public image_name: string

  @CreateDateColumn()
  public created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
