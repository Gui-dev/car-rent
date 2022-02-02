import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { RentalController } from '@modules/rentals/infra/http/controllers/RentalController'
import { DevolutionRentalController } from '@modules/rentals/infra/http/controllers/DevolutionRentalController'

const rentalsRoutes = Router()
const rentalController = new RentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.get('/', ensureAuthenticated, rentalController.index)
rentalsRoutes.post('/:car_id', ensureAuthenticated, rentalController.create)
rentalsRoutes.post('/devolutions/:rental_id', ensureAuthenticated, devolutionRentalController.create)

export {
  rentalsRoutes
}
