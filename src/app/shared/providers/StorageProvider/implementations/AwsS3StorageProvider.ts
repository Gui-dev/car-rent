import uploadMulter from '@config/uploadMulter'
import { S3 } from 'aws-sdk'
import { resolve } from 'path'
import { promises } from 'fs'
import mime from 'mime'

import { IStorageProvider } from '../models/IStorageProvider'

export class AwsS3StorageProvider implements IStorageProvider {
  private clientS3: S3

  constructor () {
    this.clientS3 = new S3({
      region: process.env.AWS_BUCKET_REGION
    })
  }

  public async save (file: string, folder: string): Promise<string> {
    const originalName = resolve(uploadMulter.tmpFolder, file)
    const fileContent = await promises.readFile(originalName)
    const contentType = mime.getType(originalName) || undefined

    await this.clientS3.putObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
      Body: fileContent,
      ContentType: contentType,
      ACL: 'public-read'
    }).promise()

    await promises.unlink(originalName)

    return file
  }

  public async delete (file: string, folder: string): Promise<void> {
    await this.clientS3.deleteObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file
    }).promise()
  }
}
