import { Db, MongoClient } from 'mongodb'

let uri : string = process.env.MONGODB_URI!; 
let dbName: string = process.env.MONGODB_DB!;

let cachedClient : MongoClient;
let cachedDb : Db;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() : Promise<{client: MongoClient, db: Db}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }


  const client = await MongoClient.connect(uri)

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db
  
  return { client, db }
}