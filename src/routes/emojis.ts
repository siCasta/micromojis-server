import { Router } from 'oak'

import { getEmoji, getEmojis, sweetFailure } from 'controllers/emojis.ts'

const router = new Router()
const subRouter = new Router()

subRouter
    .get('/', getEmojis)
    .get('/sweet-failure', sweetFailure)
    .get('/:eid', getEmoji)

router.use('/emojis', subRouter.routes())

export default router
