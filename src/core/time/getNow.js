import { DateTime } from 'luxon'

export const getNow = () => {
  return DateTime.utc()
}
