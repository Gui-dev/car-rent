import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/model/Rental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>
  findById(rental_id: string): Promise<Rental | undefined>
}
