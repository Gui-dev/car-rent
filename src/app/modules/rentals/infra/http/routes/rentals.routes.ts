import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { CreateRentalController } from '@modules/rentals/infra/http/controllers/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/infra/http/controllers/DevolutionRentalController'

const rentalsRoutes = Router()
const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.post('/:car_id', ensureAuthenticated, createRentalController.create)
rentalsRoutes.post('/devolutions/:rental_id', ensureAuthenticated, devolutionRentalController.create)

export {
  rentalsRoutes
}
