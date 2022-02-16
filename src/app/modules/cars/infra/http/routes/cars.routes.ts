import { Router } from 'express'
import multer from 'multer'

import { CarController } from '@modules/cars/infra/http/controllers/CarController'
import { CarSpecificationController } from '@modules/cars/infra/http/controllers/CarSpecificationController'
import { CarImageController } from '@modules/cars/infra/http/controllers/CarImageController'
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin'
import multerConfig from '@config/uploadMulter'

const carsRouter = Router()
const carController = new CarController()
const carSpecificationController = new CarSpecificationController()
const carImageController = new CarImageController()

const uploadImages = multer(multerConfig)

carsRouter.get('/availables', carController.index)
carsRouter.post('/', ensureAuthenticated, ensureAdmin, carController.create)
carsRouter.post('/specifications/:car_id', ensureAuthenticated, ensureAdmin, carSpecificationController.create)
carsRouter.post(
  '/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  carImageController.create
)

export {
  carsRouter
}
