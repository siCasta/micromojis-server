import { Application } from 'oak'
import { oakCors } from 'oakCors'

import logger from 'middlewares/logger.ts'
import notFound from 'middlewares/notFound.ts'
import staticFiles from 'middlewares/staticFiles.ts'

import emojisRoutes from 'routes/emojis.ts'
import errorHandler from './middlewares/errorHandler.ts'

const app = new Application()

// middlewares
app.use(logger)
app.use(oakCors())
app.use(errorHandler)
app.use(staticFiles(`${Deno.cwd()}/public`))

// routes
app.use(emojisRoutes.routes())
app.use(emojisRoutes.allowedMethods())

// 404
app.use(notFound)

export default app
