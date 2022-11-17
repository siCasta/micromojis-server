import { Application } from 'oak'
import { oakCors } from 'oakCors'

import logger from 'middlewares/logger.ts'
import notFound from 'middlewares/notFound.ts'
import staticFiles from 'middlewares/staticFiles.ts'
import errorHandler from './middlewares/errorHandler.ts'

import emojisRoutes from 'routes/emojis.ts'
import searchRoutes from 'routes/search.ts'
import indexRoutes from 'routes/index.ts'

const app = new Application()

// middlewares
app.use(logger)
app.use(oakCors())
app.use(errorHandler)
app.use(staticFiles(`${Deno.cwd()}/public`))

// routes
// ---- /
app.use(indexRoutes.routes())
app.use(indexRoutes.allowedMethods())
// ---- /emojis
app.use(emojisRoutes.routes())
app.use(emojisRoutes.allowedMethods())
// ---- /search
app.use(searchRoutes.routes())
app.use(searchRoutes.allowedMethods())

// 404
app.use(notFound)

export default app
