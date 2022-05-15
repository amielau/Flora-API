import { ObjectID } from 'mongodb'
import { cleanModel } from './cleanModel'
import { active } from './status'

export const findOne = async (collection, query = {}) => {
  if (query.id) {
    query._id = ObjectID(query.id)
    delete query.id
  }
  const result = await collection.findOne({
    ...active(),
    ...query,
  })

  return cleanModel(result)
}
