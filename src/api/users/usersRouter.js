import { Router } from 'express'
import { createAccount } from './createAccount'
import { login } from './login'

// prefix: /api/users

export const usersRouter = () => {
  const router = Router()

  // create account
  router.post('/', createAccount)

  // log in
  router.post('/login', login)

  return router
}
