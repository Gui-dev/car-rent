import { sign } from 'jsonwebtoken'

import { IJsonWebTokenProvider } from '../models/IJsonWebTokenProvider'

export class JsonWebTokenProvider implements IJsonWebTokenProvider {
  public async generate (id: string): Promise<string> {
    return sign({}, 'minhachavesecreta', {
      subject: id,
      expiresIn: '1d'
    })
  }
}
