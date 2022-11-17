import db from 'models/db.ts'
import { EmojiSchema } from 'types/emojis.d.ts'

const EmojiCollection = db.collection<EmojiSchema>('emojis')

export default EmojiCollection
