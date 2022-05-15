import { active } from './status'

export const count = async (collection, filter = {}) => {
  const query = {
    ...active(),
    ...filter,
  }

  return collection.countDocuments(query)
}
