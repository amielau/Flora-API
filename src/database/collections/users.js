import { collectionNames } from './collectionNames'
import { getActions } from '../actions/getActions'

export const Users = () => {
  const actions = getActions(collectionNames.Users)

  return {
    ...actions
  }
}
