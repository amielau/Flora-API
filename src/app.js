import express from 'express'
import cookieParser from 'cookie-parser'
import { apiRouter } from './api/apiRouter.js'
import pkg from 'body-parser'
const { json, urlencoded } = pkg

const configurePolicies = (app) => {
  const bodyLimit = { limit: '20mb' }

  app.use(json(bodyLimit))
  app.use(urlencoded({ extended: false, ...bodyLimit }))

  // app.use(corsOptionDelegation)
  // app.options('*', corsOptionDelegation)
  // app.head('*', corsOptionDelegation)

  app.use(cookieParser())

  return app
}

const registerApi = (app) => {
  app.use('/api', apiRouter())
  app.use('/api*', (req, res) =>
    res.status(404).json({ message: 'No matching API route', name: 'NotFound' })
  )
  return app
}

const handleErrors = (app) => {
  app.use((err, req, res, next) => {
    console.log(
      `API Error: ${err.name}; ${req.method} ${req.originalUrl}${additional}`,
      err
    )
  })

  app.use((req, res) => {
    res.status(404).json({
      message: `No matching handler found; '${req.method} ${req.url}'`
    })
  })

  return app
}

export const start = async () => {
  let app = express()

  app = configurePolicies(app)
  app = registerApi(app)
  app = handleErrors(app)

  return app
}
