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
}
