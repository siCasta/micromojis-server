import { RouterContext } from 'oak'
import EmojiCollection from 'models/Emoji.ts'
import { convertEmojis } from '../utils/functions.ts'

export const findEmojis = async (ctx: RouterContext<'/:es'>) => {
    const { request: req, response: res } = ctx
    const { searchParams: query } = req.url
    const unicodeNameToSearch = ctx.params.es
    const pParam = query.get('page')! || 1
    const qParam = query.get('emojis')! || 100
    const page = parseInt(pParam as string) - 1
    const emojisLength = await EmojiCollection.countDocuments({
        unicodeName: {
            $regex: `.*${unicodeNameToSearch}.*`
        }
    })
    const quantity =
        qParam === 'all' ? emojisLength : parseInt(qParam as string)
    const pages = Math.ceil(emojisLength / quantity)

    if (isNaN(page) || isNaN(quantity))
        ctx.throw(400, "Oppss! those aren't numbers 😠")
    if (page < 0) ctx.throw(404, 'Oppss! Noting here 😶‍🌫️')

    const emojisInDB = await EmojiCollection.find({
        $or: [
            {
                unicodeName: {
                    $regex: `.*${unicodeNameToSearch}.*`
                }
            },
            {
                slug: {
                    $regex: `.*${unicodeNameToSearch}.*`
                }
            }
        ]
    })
        .skip(page * quantity)
        .limit(quantity)
        .sort({
            unicodeName: 1
        })
        .toArray()

    if (emojisInDB.length < 1) ctx.throw(404, 'Oppss! Not found 😶‍🌫️')

    const emojis = convertEmojis(emojisInDB, req)

    res.status = 200
    res.body = {
        message: 'Yup all emojis fetched successfully 😊',
        emojis,
        pages
    }
}
