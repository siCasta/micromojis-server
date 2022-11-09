import { Context } from 'oak'

const crossOrigin = async (ctx: Context, next: () => Promise<unknown>) => {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*')
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET')
    ctx.response.headers.set('Access-Control-Allow-Header', '*')

    await next()
}

export default crossOrigin
