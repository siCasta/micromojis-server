import { ObjectId } from 'mongo'

export interface EmojiSchema {
    _id: ObjectId
    name: string
    emoji: string
    slug: string
}

export interface EmojiResponse {
    name: string
    emoji: string
    url?: string
    slug: string
}
