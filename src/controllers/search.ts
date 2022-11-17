import { RouterContext } from 'oak'
import { Filter } from 'mongo'

import EmojiCollection from 'models/Emoji.ts'
import { convertEmojis } from 'utils/functions.ts'
import { EmojiSchema } from 'types/emojis.d.ts'

export const findEmojis = async (ctx: RouterContext<'/:es'>) => {
    const { request: req, response: res } = ctx
    const { searchParams: query } = req.url

    const searchParams = ctx.params.es
    const pQuery = query.get('page')! || 1
    const qQuery = query.get('emojis')! || 100

    const searchOptions: Filter<EmojiSchema> = {
        $or: [
            {
                name: {
                    $regex: `.*${searchParams}.*`
                }
            },
            {
                slug: {
                    $regex: `.*${searchParams}.*`
                }
            }
        ]
    }

    const page = parseInt(pQuery as string) - 1
    const emojisLength = await EmojiCollection.countDocuments(searchOptions)
    const quantity =
        qQuery === 'all' ? emojisLength : parseInt(qQuery as string)
    const pages = Math.ceil(emojisLength / quantity)

    if (isNaN(page) || isNaN(quantity))
        ctx.throw(400, "Oppss! those aren't numbers 😠")
    if (page < 0) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    const emojisInDB = await EmojiCollection.find(searchOptions)
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
        message: `Yup emojis with ${searchParams} fetched successfully 😊`,
        emojis,
        pages
    }
}
