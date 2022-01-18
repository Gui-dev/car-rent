import { Router } from 'express'

import { CarController } from '@modules/cars/infra/http/controllers/CarController'
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin'

const carsRouter = Router()
const carController = new CarController()

carsRouter.get('/availables', carController.index)
carsRouter.post('/', ensureAuthenticated, ensureAdmin, carController.create)

export {
  carsRouter
}
