import { Context, send } from 'oak'
import { fileExists } from 'utils/functions.ts'

const staticFiles = (staticPath: string) => {
    return async (ctx: Context, next: () => Promise<unknown>) => {
        const { request: req } = ctx
        const path = `${staticPath}${req.url.pathname}`

        if (
            req.url.pathname === '/' &&
            (await fileExists(`${staticPath}/index.html`))
        ) {
            await send(ctx, `${req.url.pathname}index.html`, {
                root: `${staticPath}`,
            })
        } else if (await fileExists(path))
            await send(ctx, req.url.pathname, {
                root: `${staticPath}`,
            })
        else await next()
    }
}

export default staticFiles
