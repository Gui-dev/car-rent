import { Router } from 'express'

import { usersRoutes } from '@modules/users/infra/http/routes/user.routes'
import { sessionsRoutes } from '@modules/users/infra/http/routes/session.routes'
import { categoriesRouter } from '@modules/categories/infra/http/routes/categories.routes'
import { specifcationsRouter } from '@modules/specifications/infra/http/routes/specifications.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specifcationsRouter)

export {
  routes
}
