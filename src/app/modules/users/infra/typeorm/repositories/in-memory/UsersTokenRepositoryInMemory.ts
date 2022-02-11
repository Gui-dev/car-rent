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

  public async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserToken | undefined> {
    const token = this.userTokenRepository.find(
      token => token.user_id === user_id && token.refresh_token === refresh_token
    )

    return token
  }

  public async deleteById (id: string): Promise<void> {
    this.userTokenRepository.find(token => token.user_id !== id)
  }

  public async findByRefreshToken (refresh_token: string): Promise<UserToken | undefined> {
    const token = this.userTokenRepository.find(
      token => token.refresh_token === refresh_token
    )

    return token
  }
}
