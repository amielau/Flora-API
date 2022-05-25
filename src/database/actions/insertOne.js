import { ObjectId } from 'mongodb'
import { cleanModel } from './cleanModel'
import { created } from './status'
import { secureForDisk, prepareForUse } from './secureForDisk'

export const insertOne = async (collection, doc, createdBy) => {
  if (!createdBy) {
    throw new Error('createdBy is required')
  }

  if (doc.id || doc._id) {
    throw new Error('Cannot insert doc with id or _id')
  }

  const prepared = {
    ...secureForDisk(doc),
    ...created(createdBy)
  }

  const result = await collection.insertOne(prepared)

  if (!result.insertedId) {
    console.log('Could not insert document', JSON.stringify(doc))
    throw new Error('could not insert document')
  }

  const inserted = await collection.findOne({
    _id: ObjectId(result.insertedId)
  })

  return cleanModel(prepareForUse(inserted))
}
