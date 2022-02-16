import { IStorageProvider } from '../models/IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  public async save (file: string, folder: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  public async delete (file: string, folder: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
