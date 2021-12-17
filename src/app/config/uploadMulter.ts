import { Express, Request } from 'express'
import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp')
const uploadFolder = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

const storage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback) => {
    return callback(null, uploadFolder)
  },
  filename: (request: Request, file: Express.Multer.File, callback) => {
    const fileHash = crypto.randomBytes(10).toString('hex')
    const filename = `${fileHash}&${file.originalname}`

    return callback(null, filename)
  }
})

export const uploadMulter = {
  dest: tmpFolder,
  storage
}
