import { ObjectID } from 'mongodb'
import { cleanModel } from './cleanModel'
import { active } from './status'

export const getById = async (collection, id) => {
  if (!id) throw new Error('id is required')

  const found = await collection.findOne({
    ...active(),
    _id: ObjectID(id),
  })

  return cleanModel(found)
}
