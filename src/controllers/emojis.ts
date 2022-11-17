import { RouterContext } from 'oak'

import EmojiCollection from 'models/Emoji.ts'
import { convertEmojis } from 'utils/functions.ts'

export const sweetFailure = (ctx: RouterContext<'/sweet-failure'>) => {
    ctx.throw(500, "That's suppose to happen don't worry 🍦")
}

export const getEmojis = async (ctx: RouterContext<'/'>) => {
    const { response: res, request: req } = ctx
    const { searchParams: query } = req.url

    const pParam = query.get('page')! || 1
    const qParam = query.get('emojis')! || 100

    const page = parseInt(pParam as string) - 1
    const emojisLength = await EmojiCollection.countDocuments()
    const quantity =
        qParam === 'all' ? emojisLength : parseInt(qParam as string)
    const pages = Math.ceil(emojisLength / quantity)

    if (isNaN(page) || isNaN(quantity))
        ctx.throw(400, "Oppss! those aren't numbers 😠")
    if (page < 0) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    const emojisInDB = await EmojiCollection.find()
        .skip(page * quantity)
        .limit(quantity)
        .sort({
            name: 1
        })
        .toArray()

    if (emojisInDB.length < 1) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    const emojis = convertEmojis(emojisInDB, req)

    res.status = 200
    res.body = {
        message: 'Yup all emojis fetched successfully 😊',
        emojis,
        pages
    }
}

export const getEmoji = async (ctx: RouterContext<'/:es'>) => {
    const { response: res, request: req } = ctx

    const searchParams = ctx.params.es

    const emoji = await EmojiCollection.findOne(
        {
            $or: [
                {
                    name: searchParams
                },
                {
                    slug: searchParams
                }
            ]
        },
        {
            projection: {
                _id: 0
            }
        }
    )

    if (!emoji) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    emoji.emoji = `${req.url.origin}${emoji.emoji}`

    res.status = 200
    res.body = {
        message: 'Yup you got the emoji successfully 😊',
        emoji
    }
}
