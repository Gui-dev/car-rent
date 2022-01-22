import { inject, injectable } from 'tsyringe'

import { ICarImagesRepository } from '../repositories/ICarImagesRepository'

type UploadCarImagesProps = {
  car_id: string
  images_name: Array<string>
}

@injectable()
export class UploadCarImagesService {
  constructor (
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}

  public async execute ({ car_id, images_name }: UploadCarImagesProps): Promise<void> {
    images_name.map(async (image) => {
      await this.carImagesRepository.create({
        car_id,
        image_name: image
      })
    })
  }
}
