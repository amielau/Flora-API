import { config } from '../../config'
import { badRequest } from '../../core/http/badRequest'
import { ok } from '../../core/http/ok'
import { database } from '../../database/database'
import { issueToken } from './issueToken'

export const login = async (req, res) => {
  const { username, password } = req.body

  const user = await database.Users.findOne({ username })

  if (password !== user.password) {
    return badRequest(res, 'wrong credentials')
  }

  return ok(res, {
    user: {
      username: user.username,
      email: user.email,
      fullName: user.fullName
    },
    token: issueToken(config.JWT_SECRET, { userId: user.id })
  })
}
