import { Router } from 'express'

import { CarController } from '@modules/cars/infra/http/controllers/CarController'

const carsRouter = Router()
const carController = new CarController()

carsRouter.post('/', carController.create)

export {
  carsRouter
}
