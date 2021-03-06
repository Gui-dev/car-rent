import { Router } from 'express'

import { usersRoutes } from '@modules/users/infra/http/routes/user.routes'
import { sessionsRoutes } from '@modules/users/infra/http/routes/session.routes'
import { categoriesRouter } from '@modules/categories/infra/http/routes/categories.routes'
import { specifcationsRouter } from '@modules/specifications/infra/http/routes/specifications.routes'
import { carsRouter } from '@modules/cars/infra/http/routes/cars.routes'
import { rentalsRoutes } from '@modules/rentals/infra/http/routes/rentals.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specifcationsRouter)
routes.use('/cars', carsRouter)
routes.use('/rentals', rentalsRoutes)

export {
  routes
}
