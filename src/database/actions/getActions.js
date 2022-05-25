import { getCollection } from '../connection'
import { count } from './count'
import { deleteOne } from './deleteOne'
import { find } from './find'
import { findOne } from './findOne'
import { getById } from './getById'
import { insertOne } from './insertOne'
import { updateOne } from './updateOne'

export const getActions = (collectionName, helpers = {}) => {
  const thunkCollection = async (thunk) => {
    const collection = await getCollection(collectionName)
    return thunk(collection)
  }

  return {
    count: (query) => thunkCollection((collection) => count(collection)),

    deleteOne: (id, deletedBy) =>
      thunkCollection((collection) => deleteOne(collection, id, deletedBy)),

    find: (query, page, perPage, sort) =>
      thunkCollection((collection) =>
        find(collection, query, page, perPage, sort)
      ),

    findOne: (query) =>
      thunkCollection((collection) => findOne(collection, query)),

    getById: (id) => thunkCollection((collection) => getById(collection, id)),

    insertOne: (doc, createdBy) =>
      thunkCollection((collection) => insertOne(collection, doc, createdBy)),

    updateOne: (doc, updatedBy) =>
      thunkCollection((collection) => updateOne(collection, doc, updatedBy)),

    __UNSAFE__deleteOne: (filter = {}) =>
      thunkCollection((collection) => collection.deleteOne(filter)),

    __UNSAFE__deleteMany: (filter = {}) =>
      thunkCollection((collection) => collection.deleteMany(filter))
  }
}
