import { Router } from 'express'

import { CarController } from '@modules/cars/infra/http/controllers/CarController'
import { CarSpecificationController } from '@modules/cars/infra/http/controllers/CarSpecificationController'
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin'

const carsRouter = Router()
const carController = new CarController()
const carSpecificationController = new CarSpecificationController()

carsRouter.get('/availables', carController.index)
carsRouter.post('/', ensureAuthenticated, ensureAdmin, carController.create)
carsRouter.post('/specifications/:car_id', ensureAuthenticated, ensureAdmin, carSpecificationController.create)

export {
  carsRouter
}
