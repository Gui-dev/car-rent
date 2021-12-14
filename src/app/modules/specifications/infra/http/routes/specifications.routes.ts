import { Router } from 'express'

import { SpecificationsRepository } from '@modules/specifications/infra/typeorm/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '@modules/specifications/services/CreateSpecificationService'

const specifcationsRouter = Router()
const specificationsRepository = new SpecificationsRepository()

specifcationsRouter.post('/', async (req, res) => {
  const { name, description } = req.body
  const createSpecificationService = new CreateSpecificationService(specificationsRepository)
  const specification = await createSpecificationService.execute({ name, description })

  return res.status(201).json(specification)
})

export {
  specifcationsRouter
}
