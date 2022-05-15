import { active } from './status'
import { cleanModel } from './cleanModel'

export const find = async (
  collection,
  filter = {},
  page = 0,
  perPage = 200,
  sort
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0

  const query = {
    ...active(),
    ...filter
  }

  let cursor = collection.find(query).skip(skip).limit(perPage)

  if (sort) {
    cursor = cursor.sort(sort)
  }

  const results = await cursor.toArray()

  return results.map(cleanModel)
}
