import { ObjectId } from 'mongo'

export interface EmojiSchema {
    _id: ObjectId
    unicodeName: string
    emoji: string
    slug: string
}

export interface EmojiResponse {
    unicodeName: string
    emoji: string
    url?: string
    slug: string
}
