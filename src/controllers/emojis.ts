import { RouterContext } from 'oak'
import EmojiCollection from 'models/Emoji.ts'
import { ObjectId } from 'mongo'

export const sweetFailure = (ctx: RouterContext<'/emojis/sweet-failure'>) => {
    ctx.throw(500, "That's suppose to happen don't worry 🍦")
}

export const getEmojis = async (ctx: RouterContext<'/emojis'>) => {
    const { response: res, request: req } = ctx
    const { searchParams: query } = req.url
    const pParam = query.get('page')! || 0
    const qParam = query.get('emojis')! || 100
    const page = parseInt(pParam as string)
    const quantity = parseInt(qParam as string)
    const emojisLength = await EmojiCollection.countDocuments()
    const pages = Math.floor(emojisLength / quantity)

    if (isNaN(page) || isNaN(quantity))
        ctx.throw(400, "Oppss! those aren't numbers 😠")
    if (page < 0) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    const emojisInDB = await EmojiCollection.find()
        .skip(page * quantity)
        .limit(quantity)
        .toArray()
    const emojis = emojisInDB.map(emoji => ({
        ...emoji,
        emoji: `${req.url.origin}${emoji.emoji}`,
        url: `${req.url.origin}/emojis/${emoji._id.toString()}`
    }))

    if (emojis.length < 1) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    res.status = 200
    res.body = {
        message: 'Yup all emojis fetched successfully 😊',
        emojis,
        pages
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
