import { ObjectId } from 'mongo'
import db from 'models/db.ts'

export interface EmojiSchema {
    _id: ObjectId
    unicodeName: string
    emoji: string
    slug: string
    url: string
}

const EmojiCollection = db.collection<EmojiSchema>('emojis')

export default EmojiCollection
