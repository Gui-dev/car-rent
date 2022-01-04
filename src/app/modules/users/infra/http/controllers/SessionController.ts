import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'

export class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserService = container.resolve(AuthenticateUserService)

    const user = await authenticateUserService.execute({ email, password })
    return response.status(201).json(instanceToPlain(user))
  }
}
