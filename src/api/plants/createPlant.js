import { ok } from '../../core/http/ok'
import { database } from '../../database/database'

export const createPlant = async (req, res) => {
  const { id: userId } = req.authUser
  const { type, nickname, careAlerts, careInst, waterDaily } = req.body

  const result = await database.Plants.insertOne(
    { userId, type, nickname, careAlerts, careInst, waterDaily },
    userId
  )

  ok(res, result)
}
