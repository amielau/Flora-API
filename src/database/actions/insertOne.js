import { ObjectId } from 'mongodb'
import { created } from './status'
import { cleanModel } from './cleanModel'

export const insertOne = async (collection, doc, createdBy) => {
  if (!createdBy) {
    throw new Error('createdBy is required')
  }

  if (doc.id || doc._id) {
    throw new Error('Cannot insert doc with id or _id')
  }

  const prepared = {
    ...doc,
    ...created(createdBy)
  }

  const result = await collection.insertOne(prepared)
  console.log('result', JSON.stringify(result))

  if (!result.insertedId) {
    console.log('Could not insert document', JSON.stringify(doc))
    throw new Error('could not insert document')
  }

  const inserted = await collection.findOne({
    _id: ObjectId(result.insertedId)
  })

  return cleanModel(inserted)
}
