import { Router } from 'express'
import { createPlant } from './createPlant'
import { getPlants } from './getPlants'

// prefix: /api/plants

export const plantsRouter = () => {
  const router = Router()

  router.post('/', createPlant)
  router.get('/', getPlants)

  return router
}
