import { Router } from 'oak'
import {
    getEmoji,
    getEmojis,
    postEmoji,
    sweetFailure
} from 'controllers/emojis.ts'

const router = new Router()
const subRouter = new Router()

subRouter
    .get('/', getEmojis)
    .get('/sweet-failure', sweetFailure)
    .get('/:eid', getEmoji)
    .post('/', postEmoji)

router.use('/emojis', subRouter.routes())

export default router
