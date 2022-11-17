import { Request } from 'oak'
import { EmojiResponse, EmojiSchema } from 'types/emojis.d.ts'

export const fileExists = async (path: string) => {
    try {
        const stats = await Deno.lstat(path)

        return stats && stats.isFile
    } catch (e) {
        if (e && e instanceof Deno.errors.NotFound) return false
        else return e
    }
}

export const convertEmojis = (emojis: Array<EmojiSchema>, req: Request) => {
    return emojis.map(emoji => ({
        ...emoji,
        _id: undefined,
        emoji: `${req.url.origin}${emoji.emoji}`,
        url: `${req.url.origin}/emojis/${emoji.slug}`
    })) as Array<EmojiResponse>
}
