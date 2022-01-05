import { User } from '@modules/users/infra/typeorm/model/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

export interface IUserRepository {
  create (data: ICreateUserDTO): Promise<User>
  findByEmail (email: string): Promise<User>
  findById (id: string): Promise<User>
}
