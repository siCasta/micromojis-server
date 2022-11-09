import { Context } from 'oak'

const logger = async (ctx: Context, next: () => Promise<unknown>) => {
    const { request: req, response: res } = ctx
    const then = performance.now()

    await next()

    const resTime = performance.now() - then

    console.log(`${req.method} ${req.url.pathname} ${res.status} - ${resTime}`)
}

export default logger
