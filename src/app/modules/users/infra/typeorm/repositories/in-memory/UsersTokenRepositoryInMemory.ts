import { IUsersTokenDTO } from '@modules/users/dtos/IUsersTokenDTO'
import { IUsersTokenRepository } from '@modules/users/repositories/IUsersTokenRepository'
import { UserToken } from '../../model/UserToken'

export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private userTokenRepository: UserToken[] = []

  public async create (data: IUsersTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken.refresh_token, { data })
    this.userTokenRepository.push(userToken)

    return userToken
  }
}
