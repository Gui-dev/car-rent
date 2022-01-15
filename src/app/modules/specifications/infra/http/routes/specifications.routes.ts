import { Router } from 'express'

import { SpecificationController } from '@modules/specifications/infra/http/controllers/SpecificationController'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin'

const specifcationsRouter = Router()
const specificationController = new SpecificationController()

specifcationsRouter.post('/', ensureAuthenticated, ensureAdmin, specificationController.create)

export {
  specifcationsRouter
}
