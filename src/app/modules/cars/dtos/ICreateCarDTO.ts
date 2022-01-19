import { Specification } from '@modules/specifications/infra/typeorm/model/Specification'

export interface ICreateCarDTO {
  category_id: string
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  specifications?: Specification[]
}
