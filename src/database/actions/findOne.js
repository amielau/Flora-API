import { ObjectId } from 'mongodb'
import { cleanModel } from './cleanModel'
import { active } from './status'

export const findOne = async (collection, query = {}) => {
  if (query.id) {
    query._id = ObjectId(query.id)
    delete query.id
  }

  console.log('query', {
    ...active(),
    ...query
  })

  const result = await collection.findOne({
    ...active(),
    ...query
  })

  return cleanModel(result)
}
