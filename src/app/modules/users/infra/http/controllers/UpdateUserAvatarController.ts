import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'

export class UpdateUserAvatarController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { filename } = request.file
    const user_id = request.userId
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatarService.execute({
      user_id,
      avatar_file: filename
    })

    return response.status(201).json(user)
  }
}
