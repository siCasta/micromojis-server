import { MongoClient } from 'mongo'
import env from '../config/environment.ts'

const client = new MongoClient()

await client.connect(env.mongoURI)

const db = client.database('emojis-api')

export default db
