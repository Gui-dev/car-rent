import { Request, Response, NextFunction } from 'express'
import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import { AppError } from '@shared/infra/error/AppError'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5
})

export const rateLimiter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    console.log(error)
    throw new AppError('Too many requests', 429)
  }
}
