import { Application } from 'oak'

import logger from 'middlewares/logger.ts'
import notFound from 'middlewares/notFound.ts'
import staticFiles from 'middlewares/staticFiles.ts'
import crossOrigin from 'middlewares/crossOrigin.ts'

import emojisRoutes from 'routes/emojis.ts'
import errorHandler from './middlewares/errorHandler.ts'

const app = new Application()

// middlewares
app.use(logger)
app.use(crossOrigin)
app.use(errorHandler)
app.use(staticFiles(`${Deno.cwd()}/public`))

// routes
app.use(emojisRoutes.routes())
app.use(emojisRoutes.allowedMethods())

// 404
app.use(notFound)

export default app
