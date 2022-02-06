import { IUsersTokenDTO } from '../dtos/IUsersTokenDTO'
import { UserToken } from '../infra/typeorm/model/UserToken'

export interface IUsersTokenRepository {
  create (data: IUsersTokenDTO): Promise<UserToken>
}
