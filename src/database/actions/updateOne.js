import { ObjectId } from 'mongodb'
import { cleanModel } from './cleanModel'
import { flatten } from './flattenDoc'
import { getInObject } from '../../core/data/getInObj'
import { updated } from './status'

export const updateOne = async (collection, doc, updatedBy) => {
  if (!updatedBy) throw new Error('updatedBy is required')

  if (!doc.id) throw new Error('Unable to update a doc without an id')

  const flattenedUpdated = flatten(doc)
  const updatedKeys = Object.keys(flattenedUpdated)
    .filter((key) => !key.startsWith('status'))
    .filter((key) => key !== 'id')

  if (updatedKeys.length === 0) {
    return doc
  }

  const updatedValues = updatedKeys.reduce(
    (acc, key) => {
      const arrayBracketIndex = key.indexOf('[')
      if (arrayBracketIndex >= 0) {
        const arrayPath = key.slice(0, arrayBracketIndex - 1)
        if (acc.$set[arrayPath]) {
          return acc
        }
        const updatedArray = getInObject(doc, arrayPath.split('.'))
        acc.$set[arrayPath] = updatedArray
      } else if (flattenedUpdated[key] == null) {
        acc.$unset[key] = flattenedUpdated[key]
      } else {
        acc.$set[key] = flattenedUpdated[key]
      }

      return acc
    },
    { $set: {}, $unset: {} }
  )

  const updateSet = {
    $set: {
      ...updatedValues.$set,
      ...updated(updatedBy)
    },
    $unset: {
      ...updatedValues.$unset
    }
  }

  if (Object.keys(updateSet.$unset).length === 0) {
    delete updateSet.$unset
  }

  const result = await collection.findOneAndUpdate(
    { _id: ObjectId(doc.id) },
    updateSet,
    { returnDocument: 'after' }
  )

  if (result.ok !== 1) {
    throw new Error('Could not update document')
  }

  return cleanModel(result.value)
}
