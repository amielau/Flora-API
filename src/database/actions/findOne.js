import { ObjectId } from 'mongodb'
import { cleanModel } from './cleanModel'
import { prepareForUse } from './secureForDisk'
import { active } from './status'

export const findOne = async (collection, query = {}) => {
  if (query.id) {
    query._id = ObjectId(query.id)
    delete query.id
  }

  const result = await collection.findOne({
    ...active(),
    ...query
  })

  return cleanModel(prepareForUse(result))
}
