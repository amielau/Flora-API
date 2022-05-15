import { collectionNames } from './collectionNames'
import { getActions } from '../actions/getActions'

export const Requests = () => {
  const actions = getActions(collectionNames.Requests)

  return {
    ...actions
  }
}
