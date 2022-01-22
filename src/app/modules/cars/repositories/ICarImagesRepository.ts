import { IUploadCarImagesDTO } from '../dtos/IUploadCarImagesDTO'
import { CarImage } from '../infra/typeorm/model/CarImage'

export interface ICarImagesRepository {
  create(data: IUploadCarImagesDTO): Promise<CarImage>
}
