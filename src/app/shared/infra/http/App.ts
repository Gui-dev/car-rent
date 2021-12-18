import express from 'express'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'

import swaggerFile from './../../../../../swagger.json'

import { routes } from '@shared/infra/http/routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', serve, setup(swaggerFile))

app.use(routes)

export {
  app
}
