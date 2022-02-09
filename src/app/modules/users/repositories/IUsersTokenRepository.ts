import { IUsersTokenDTO } from '../dtos/IUsersTokenDTO'
import { UserToken } from '../infra/typeorm/model/UserToken'

export interface IUsersTokenRepository {
  create (data: IUsersTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserToken | undefined>
  deleteById (id: string): Promise<void>
}
