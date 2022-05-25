import { badRequest } from '../../core/http/badRequest'
import { ok } from '../../core/http/ok'
import { database } from '../../database/database'

export const createAccount = async (req, res) => {
  const { username, password, email, fullName } = req.body

  console.log('values', req.body)

  if (!username || !password || !email || !fullName) {
    return badRequest(res, 'missing required params')
  }

  const existing = await database.Users.findOne({ email })

  console.log('existing', existing)

  if (existing) {
    return badRequest(res, 'email is already in use')
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

  ok(res, { username, email, fullName })
  /// do stuff
}
