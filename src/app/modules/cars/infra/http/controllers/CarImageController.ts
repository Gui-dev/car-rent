import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesService } from '@modules/cars/services/UploadCarImagesService'

type IFilesRequest = {
  filename: string
}

export class CarImageController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params
    const images = request.files as IFilesRequest[]
    const uploadCarImagesService = container.resolve(UploadCarImagesService)

    const imagesName = images?.map(image => image.filename)

    await uploadCarImagesService.execute({
      car_id,
      images_name: imagesName
    })

    return response.status(201).send()
  }
}
