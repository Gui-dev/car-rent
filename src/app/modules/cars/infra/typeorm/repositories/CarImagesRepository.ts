import { getRepository, Repository } from 'typeorm'

import { IUploadCarImagesDTO } from '@modules/cars/dtos/IUploadCarImagesDTO'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { CarImage } from '../model/CarImage'

export class CarImagesRepository implements ICarImagesRepository {
  private carImagesRepository: Repository<CarImage>

  constructor () {
    this.carImagesRepository = getRepository(CarImage)
  }

  public async create (data: IUploadCarImagesDTO): Promise<CarImage> {
    const carImage = this.carImagesRepository.create(data)
    await this.carImagesRepository.save(carImage)

    return carImage
  }
}
