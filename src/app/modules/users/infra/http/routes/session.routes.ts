import { Router } from 'express'

import { SessionController } from '@modules/users/infra/http/controllers/SessionController'

const sessionsRoutes = Router()
const sessionController = new SessionController()

sessionsRoutes.post('/', sessionController.create)

export { sessionsRoutes }
