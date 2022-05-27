import { decrypt } from './decrypt'
import { encrypt } from './encrypt'

export const encryptFields = [
  'accessKey',
  'accessToken',
  'accountToken',
  'activityToken',
  'apiKey',
  'appKey',
  'appPassword',
  'appUserPassword',
  'authKey',
  'authToken',
  'basicAuthToken',
  'clientAccessToken',
  'clientId',
  'clientKey',
  'clientSecret',
  'developerAccessToken',
  'password',
  'secret',
  'token'
]

const findFieldInKey = (key) =>
  encryptFields.find((field) => {
    const segments = key.split('.')
    return segments[segments.length - 1].includes(field)
  })

const secureKey = (key) => {
  const parts = key.split('.')
  parts[parts.length - 1] = `secure_${parts[parts.length - 1]}`
  return parts.join('.')
}

export function secureForDisk(doc) {
  if (doc == null) {
    return doc
  }
  if (typeof doc === 'string' || typeof doc === 'number') {
    return doc
  }
  if (Array.isArray(doc)) {
    return doc.map(secureForDisk)
  }
  return Object.keys(doc).reduce((acc, key) => {
    const value = doc[key]
    const fieldInKey = findFieldInKey(key)

    if (value == null) {
      acc[key] = value
    } else if (typeof value === 'number') {
      acc[key] = value
    } else if (Array.isArray(value)) {
      acc[key] = value.map(secureForDisk)
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      acc[key] = value
    } else if (typeof value === 'object') {
      acc[key] = secureForDisk(value)
    } else if (encryptFields.indexOf(key) >= 0) {
      acc[secureKey(key)] = encrypt(doc[key])
    } else if (fieldInKey) {
      acc[secureKey(key)] = encrypt(doc[key])
    } else {
      acc[key] = doc[key]
    }
    return acc
  }, {})
}

export function prepareForUse(doc) {
  if (doc == null) {
    return doc
  }
  if (typeof doc === 'string' || typeof doc === 'number') {
    return doc
  }
  if (Array.isArray(doc)) {
    return doc.map(prepareForUse)
  }
  return Object.keys(doc).reduce((acc, key) => {
    const value = doc[key]
    if (value == null) {
      acc[key] = value
    } else if (key === '_id') {
      acc[key] = value
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      acc[key] = value
    } else if (Array.isArray(value)) {
      acc[key] = value.map(prepareForUse)
    } else if (typeof value === 'object') {
      acc[key] = prepareForUse(value)
    } else if (key.startsWith('secure_')) {
      acc[key.replace('secure_', '')] = decrypt(doc[key])
    } else {
      acc[key] = doc[key]
    }
    return acc
  }, {})
}
