import jwt from 'jsonwebtoken'

export const issueToken = (secret, claims, options) => {
  if (secret === 'NOT_SECRET') {
    console.error('Issuing token with insecure secret')
  }
  return jwt.sign(claims, secret, options)
}
