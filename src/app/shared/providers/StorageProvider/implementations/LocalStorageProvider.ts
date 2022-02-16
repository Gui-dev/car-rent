import { promises } from 'fs'
import { resolve } from 'path'

import { IStorageProvider } from '../models/IStorageProvider'
import upload from '@config/uploadMulter'
import { AppError } from '@shared/infra/error/AppError'

export class LocalStorageProvider implements IStorageProvider {
  public async save (file: string, folder: string): Promise<string> {
    await promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )

    return file
  }

  public async delete (file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      await promises.stat(filename)
      await promises.unlink(filename)
    } catch {
      throw new AppError('File not found', 404)
    }
  }
}
