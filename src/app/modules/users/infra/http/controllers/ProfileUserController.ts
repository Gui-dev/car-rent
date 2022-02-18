import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { ProfileUsersService } from '@modules/users/services/ProfileUsersService'

export class ProfileUserController {
  public async show (request: Request, response: Response): Promise<Response> {
    const user_id = request.userId
    const profileUsersService = container.resolve(ProfileUsersService)
    const profileUser = await profileUsersService.execute(user_id)

    return response.status(201).json(instanceToPlain(profileUser))
  }
}
