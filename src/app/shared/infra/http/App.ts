import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'

import swaggerFile from './../../../../../swagger.json'
import '@shared/container'
import createConnection from '@shared/infra/database'
import uploadMulter from '@config/uploadMulter'
import { AppError } from '../error/AppError'

import { routes } from '@shared/infra/http/routes'
import { rateLimiter } from '@shared/infra/http/middlewares/rateLimiter'

createConnection()
const app = express()
app.use(rateLimiter)

app.use(express.json())
app.use(cors())

app.use('/avatar', express.static(`${uploadMulter.tmpFolder}/avatar`))
app.use('/cars', express.static(`${uploadMulter.tmpFolder}/cars`))
app.use('/files', express.static(`${uploadMulter.tmpFolder}/files`))

app.use('/api-docs', serve, setup(swaggerFile))

app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    error: 'Internal Server Error'
  })
})

export {
  app
}
