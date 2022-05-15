import { getNow } from '../../core/time/getNow'

export const created = (createdBy) => ({
  status: {
    createdAt: getNow().toISO(),
    createdBy
  }
})

export const updated = (updatedBy) => ({
  'status.updatedAt': getNow().toISO(),
  'status.updatedBy': updatedBy
})

export const deleted = (deletedBy) => ({
  'status.deletedAt': getNow().toISO(),
  'status.deletedBy': deletedBy
})

export const active = () => ({
  'status.deletedBy': { $exists: false }
})
