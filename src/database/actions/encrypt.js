import crypto from 'crypto'
import { config } from '../../config'

const IV_LENGTH = 16 // For AES, this is always 16

export function encrypt(text, key = config.ENCRYPTION_KEY) {
  console.log('encrypt', text, key)
  if (!text || typeof text !== 'string') {
    return text
  }

  // Must be 256 bytes (32 characters)
  let iv = crypto.randomBytes(IV_LENGTH)
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(text)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}
