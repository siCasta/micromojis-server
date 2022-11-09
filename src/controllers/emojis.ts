import { Context } from 'oak'

export const getEmojis = (ctx: Context) => {
    const { response: res } = ctx

    res.status = 200
    res.body = {
        message: 'All emojis fetched successfully',
        emojis: [],
    }
}
