import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'

import swaggerFile from './../../../../../swagger.json'
import '@shared/container'
import createConnection from '@shared/infra/database'
import { AppError } from '../error/AppError'

import { routes } from '@shared/infra/http/routes'

createConnection()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', serve, setup(swaggerFile))

app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    error: 'Internal Server Error'
  })
})

export {
  app
}
