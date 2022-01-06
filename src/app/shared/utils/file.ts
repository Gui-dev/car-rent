import { resolve } from 'path'
import { promises } from 'fs'

import { AppError } from '@shared/infra/error/AppError'

export const deleteFile = async (folder: string, filename: string): Promise<void> => {
  const pathFile = resolve(__dirname, '..', '..', '..', '..', 'tmp', folder)

  try {
    await promises.stat(`${pathFile}/${filename}`)
    await promises.unlink(`${pathFile}/${filename}`)
  } catch {
    throw new AppError('File not found', 404)
  }
}
