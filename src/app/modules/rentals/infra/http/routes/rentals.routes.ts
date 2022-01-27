import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { CreateRentalController } from '@modules/rentals/infra/http/controllers/CreateRentalController'

const rentalsRoutes = Router()
const createRentalController = new CreateRentalController()

rentalsRoutes.post('/:car_id', ensureAuthenticated, createRentalController.create)

export {
  rentalsRoutes
}
