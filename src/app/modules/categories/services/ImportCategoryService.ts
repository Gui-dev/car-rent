import { Express } from 'express'

type ImportCategoryServiceProps = {
  file: Express.Multer.File
}

export class ImportCategoryService {
  constructor () {}

  public async execute ({ file }: ImportCategoryServiceProps) {
    console.log(file)
  }
}
