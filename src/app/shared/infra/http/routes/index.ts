import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ result: 'Hello World' })
})

export {
  routes
}
