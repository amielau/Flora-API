import { Router } from 'express'
import { usersRouter } from './users/router'

// prefix: /api

export const apiRouter = () => {
  const router = Router()

  router.use('/users', usersRouter())

  return router
}
