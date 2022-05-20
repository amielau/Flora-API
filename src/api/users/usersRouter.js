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

// example code for routes
// router.get('/get', (req, res) => {
//   res.send('it works!').status(200)
// })
// example code for routes
