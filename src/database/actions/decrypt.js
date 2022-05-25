import crypto from 'crypto'
import { config } from '../../config'

export function decrypt(text, key = config.ENCRYPTION_KEY) {
  if (!text) {
    return text
  }

  let textParts = text.split(':')
  let iv = Buffer.from(textParts.shift(), 'hex')
  let encryptedText = Buffer.from(textParts.join(':'), 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
