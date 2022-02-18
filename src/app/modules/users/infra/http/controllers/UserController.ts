import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { CreateUserServices } from '@modules/users/services/CreateUserServices'

export class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body
    const createUserService = container.resolve(CreateUserServices)
    const user = await createUserService.execute({
      name,
      email,
      password,
      driver_license
    })

    return response.status(201).json(instanceToPlain(user))
  }
}
