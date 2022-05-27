import { getActions } from '../actions/getActions'
import { collectionNames } from './collectionNames'

export const Plants = () => {
  const actions = getActions(collectionNames.Plants)

  return {
    ...actions
  }
}
