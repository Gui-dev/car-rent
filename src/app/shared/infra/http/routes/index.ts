import { Router } from 'express'

import { categoriesRouter } from '@modules/categories/infra/http/routes/categories.routes'
import { specifcationsRouter } from '@modules/specifications/infra/http/routes/specifications.routes'

const routes = Router()

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specifcationsRouter)

export {
  routes
}
