import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '../../model/User'

export class UserRepositoryInMemory implements IUserRepository {
  public users: User[] = []

  public async create (data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license
    })

    this.users.push(user)

    return user
  }

  public async findByEmail (email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user as User
  }

  public async findById (id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)

    return user as User
  }
}
