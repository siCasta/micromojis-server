import { Router } from 'oak'

import { findEmojis } from 'controllers/search.ts'

const router = new Router()
const subRouter = new Router()

subRouter.get('/:es', findEmojis)

router.use('/search', subRouter.routes())

export default router
