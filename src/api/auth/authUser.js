import jwt from 'jsonwebtoken'
import { config } from '../../config'
import { database } from '../../database/database'

export const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\ /, '')
    const { userId } = jwt.verify(token, config.JWT_SECRET)

    const { id, fullName, email, username } = await database.Users.getById(
      userId
    )

    req.authUser = { id, fullName, email, username }
  } catch (err) {
    next(err)
  }

  next()
}
