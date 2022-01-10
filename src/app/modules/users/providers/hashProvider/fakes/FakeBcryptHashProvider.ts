import { IBcryptHashProvider } from '../models/IBcryptHashProvider'

export class FakeBcryptHashProvider implements IBcryptHashProvider {
  public async generateHash (payload: string): Promise<string> {
    return payload
  }
  public async compareHash (payload: string, hash: string): Promise<boolean> {
    return payload === hash
  }
}
