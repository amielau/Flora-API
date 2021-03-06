require('dotenv').config()

export const config = {
  MONGO_URI: process.env.MONGODB_URI,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  JWT_SECRET: process.env.JWT_SECRET
}
