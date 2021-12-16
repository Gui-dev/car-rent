import { Router } from 'express'

import { SpecificationController } from '@modules/specifications/infra/http/controllers/SpecificationController'

const specifcationsRouter = Router()
const specificationController = new SpecificationController()

specifcationsRouter.post('/', specificationController.create)

export {
  specifcationsRouter
}
