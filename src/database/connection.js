import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from '../config'

console.log('config', config)

const connectionPoolSize = process.env.MONGO_DB_POOL_SIZE || 1

let db, client
let block = null

export const initialize = async () => {
  if (db == null) {
    if (block == null) {
      console.log(config.MONGO_URI)
      block = new Promise(async (resolve) => {
        const _client = new MongoClient(config.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1
        })

        client = await _client.connect()
        await client.db('app').command({ ping: 1 })

        db = client.db('app')

        console.log(`mongo connection ready (poolsize: ${connectionPoolSize})`)
        resolve(db)
      })
    }
    return block
  }
  return db
}

export const getCollection = async (collectionName) => {
  if (!db) {
    await initialize()
  }
  return db.collection(collectionName)
}

// const { MongoClient, ServerApiVersion } = require('mongodb')
// const uri =
//   'mongodb+srv://<username>:<password>@cluster0.xqmac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1
// })
// client.connect((err) => {
//   const collection = client.db('test').collection('devices')
//   // perform actions on the collection object
//   client.close()
// })
