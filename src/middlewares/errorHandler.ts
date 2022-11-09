import { Context, isHttpError } from 'oak'

const errorHandler = async (ctx: Context, next: () => Promise<unknown>) => {
    const { response: res } = ctx

    try {
        await next()
    } catch (err) {
        if (isHttpError(err)) {
            res.status = err.status
            res.body = { error: err.message }
        } else {
            res.status = err.status
            res.body = { error: err.message }
        }
    }
}

export default errorHandler
