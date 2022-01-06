import { Express, Request } from 'express'
import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

export default {
  upload (folder: string) {
    const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp', folder)
    return {
      storage: multer.diskStorage({
        destination: (request: Request, file: Express.Multer.File, callback) => {
          return callback(null, tmpFolder)
        },
        filename: (request: Request, file: Express.Multer.File, callback) => {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const filename = `${fileHash}&${file.originalname}`

          return callback(null, filename)
        }
      })
    }
  }
}
