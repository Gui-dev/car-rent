import { getRepository, Repository } from 'typeorm'

import { IUsersTokenDTO } from '@modules/users/dtos/IUsersTokenDTO'
import { IUsersTokenRepository } from '@modules/users/repositories/IUsersTokenRepository'
import { UserToken } from '../model/UserToken'

export class UsersTokenRepository implements IUsersTokenRepository {
  private usersTokenRepository: Repository<UserToken>

  constructor () {
    this.usersTokenRepository = getRepository(UserToken)
  }

  public async create (data: IUsersTokenDTO): Promise<UserToken> {
    const userToken = this.usersTokenRepository.create(data)
    await this.usersTokenRepository.save(userToken)

    return userToken
  }

  public async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserToken | undefined> {
    const token = await this.usersTokenRepository.findOne({
      where: {
        user_id,
        refresh_token
      }
    })

    return token
  }

  public async deleteById (id: string): Promise<void> {
    await this.usersTokenRepository.delete(id)
  }

  public async findByRefreshToken (refresh_token: string): Promise<UserToken | undefined> {
    const userToken = await this.usersTokenRepository.findOne({ refresh_token })

    return userToken
  }
}
