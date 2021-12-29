import { Express } from 'express'
import { inject, injectable } from 'tsyringe'
import { createReadStream, promises } from 'fs'
import { parse as csvParse } from 'csv-parse'

import { ICategoryRepository } from '../repositories/ICategoryRepository'
import { AppError } from '@shared/infra/error/AppError'

type ImportCategoryServiceProps = {
  file: Express.Multer.File
}

type loadCategoriesFileProps = {
  name: string
  description: string
}

@injectable()
export class ImportCategoryService {
  constructor (
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute ({ file }: ImportCategoryServiceProps): Promise<void> {
    const categories = await this.loadCategoriesFile({ file })

    categories.map(async (category) => {
      const { name, description } = category
      const existsCategory = await this.categoriesRepository.findByName(name)

      if (!existsCategory) {
        await this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }

  private async loadCategoriesFile ({ file }: ImportCategoryServiceProps): Promise<loadCategoriesFileProps[]> {
    return new Promise((resolve, reject) => {
      const categories: loadCategoriesFileProps[] = []
      const stream = createReadStream(file.path)
      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', (line) => {
          const [name, description] = line
          categories.push({
            name,
            description
          })
        })
        .on('end', () => {
          promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', () => {
          reject(new AppError('Error uploading file', 400))
        })

      return categories
    })
  }
}
