import { ObjectId } from 'mongodb'
import { deleted } from './status'
import { cleanModel } from './cleanModel'

export const deleteOne = async (collection, id, deletedBy) => {
  if (!deletedBy) {
    throw new Error('deletedBy is required')
  }

  const deletedResult = await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: deleted(deletedBy) },
    { returnOriginal: false }
  )
  if (deletedResult.ok !== 1) {
    throw new Error('Could not delete document')
  }

  return cleanModel(deletedResult.value)
}
