import { Router } from 'express'

import { SessionController } from '@modules/users/infra/http/controllers/SessionController'
import { RefreshTokenController } from '@modules/users/infra/http/controllers/RefreshTokenController'

const sessionsRoutes = Router()
const sessionController = new SessionController()
const refreshTokenController = new RefreshTokenController()

sessionsRoutes.post('/', sessionController.create)
sessionsRoutes.post('/refresh-tokens', refreshTokenController.create)

export { sessionsRoutes }
