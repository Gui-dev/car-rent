import { SendForgotPasswordService } from '@modules/users/services/SendForgotPasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class SendForgotPasswordController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendForgotPasswordService = container.resolve(SendForgotPasswordService)
    const newPasswordResponse = await sendForgotPasswordService.execute(email)

    return response.status(201).json(newPasswordResponse)
  }
}
