import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService'

export class ResetPasswordController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body
    const resetPasswordService = container.resolve(ResetPasswordService)
    const resetPassword = await resetPasswordService.execute({
      token: String(token),
      password
    })

    return response.status(201).json(resetPassword)
  }
}
