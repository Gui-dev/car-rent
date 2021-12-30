import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserServices } from '@modules/users/services/CreateUserServices'

export class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = request.body
    const createUserService = container.resolve(CreateUserServices)
    const user = await createUserService.execute({
      name,
      username,
      email,
      password,
      driver_license
    })

    return response.status(201).json(user)
  }
}
