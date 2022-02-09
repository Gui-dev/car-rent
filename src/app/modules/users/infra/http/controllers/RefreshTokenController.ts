import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenService } from '@modules/users/services/RefreshTokenService'

export class RefreshTokenController {
  public async create (request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers['x-access-token'] || request.query.token
    const refreshTokenService = container.resolve(RefreshTokenService)
    const refreshToken = await refreshTokenService.execute(token)

    return response.status(201).json(refreshToken)
  }
}
