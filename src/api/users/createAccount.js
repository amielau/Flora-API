import { config } from '../../config'
import { badRequest } from '../../core/http/badRequest'
import { ok } from '../../core/http/ok'
import { database } from '../../database/database'
import { issueToken } from './issueToken'

export const createAccount = async (req, res) => {
  const { username, password, email, fullName } = req.body

  if (!username || !password || !email || !fullName) {
    return badRequest(res, 'missing required params')
  }

  const existing = await database.Users.findOne({
    $or: [{ email }, { username }]
  })

  if (existing) {
    return badRequest(res, 'email or username is already in use')
  }

  const user = await database.Users.insertOne(
    {
      username,
      password,
      email,
      fullName
    },
    'api'
  )

  console.log('created user', user)

  ok(res, {
    user: { username, email, fullName },
    token: issueToken(config.JWT_SECRET, { userId: user.id })
  })
}
