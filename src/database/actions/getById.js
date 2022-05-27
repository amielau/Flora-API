import { ObjectId } from 'mongodb'
import { cleanModel } from './cleanModel'
import { prepareForUse } from './secureForDisk'
import { active } from './status'

export const getById = async (collection, id) => {
  if (!id) throw new Error('id is required')

  const found = await collection.findOne({
    ...active(),
    _id: ObjectId(id)
  })

  return cleanModel(prepareForUse(found))
}
