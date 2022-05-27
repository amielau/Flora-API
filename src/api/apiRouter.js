import { Router } from 'express'
import { authUser } from './auth/authUser'
import { plantsRouter } from './plants/plantsRouter'
import { usersRouter } from './users/usersRouter'

// prefix: /api

export const apiRouter = () => {
  const router = Router()

  router.use('/users', usersRouter())

  router.use('/plants', authUser, plantsRouter())

  return router
}
