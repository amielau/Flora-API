import { ok } from '../../core/http/ok'
import { database } from '../../database/database'

export const getPlants = async (req, res) => {
  const { id: userId } = req.authUser

  const data = await database.Plants.find({ userId })

  ok(res, data)
}
