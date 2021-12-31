import { compare, hash, genSalt } from 'bcrypt'

import { IBcryptHashProvider } from '@modules/users/providers/hashProvider/models/IBcryptHashProvider'

export class BcryptHashProvider implements IBcryptHashProvider {
  public async generateHash (payload: string): Promise<string> {
    const saltRounds = await genSalt(8)

    return hash(payload, saltRounds)
  }

  public async compareHash (payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash)
  }
}
