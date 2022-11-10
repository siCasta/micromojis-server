import { RouterContext } from 'oak'
import EmojiCollection from 'models/Emoji.ts'
import { ObjectId } from 'mongo'

export const sweetFailure = (ctx: RouterContext<'/emojis/sweet-failure'>) => {
    ctx.throw(500, "That's suppose to happen don't worry 🍦")
}

export const getEmojis = async (ctx: RouterContext<'/emojis'>) => {
    const { response: res, request: req } = ctx

    const emojisInDB = await EmojiCollection.find().toArray()
    const emojis = emojisInDB.map(emoji => ({
        ...emoji,
        emoji: `${req.url.origin}${emoji.emoji}`,
        url: `${req.url.origin}/emojis/${emoji._id.toString()}`
    }))

    res.status = 200
    res.body = {
        message: 'Yup all emojis fetched successfully 😊',
        emojis
    }
}

export const getEmoji = async (ctx: RouterContext<'/emojis/:eid'>) => {
    const { response: res, request: req } = ctx
    const _id = new ObjectId(ctx.params.eid)

    const emoji = await EmojiCollection.findOne({ _id })

    if (!emoji) ctx.throw(404, 'Oppss! Not found 😶‍🌫️')

    emoji.emoji = `${req.url.origin}${emoji.emoji}`

    res.status = 200
    res.body = {
        message: 'Yup you got the emoji successfully 😊',
        emoji
    }
}
