import { Router } from 'oak'
import { getEmoji, getEmojis, sweetFailure } from 'controllers/emojis.ts'

const router = new Router()
const path = '/emojis'

router
    .get(`${path}`, getEmojis)
    .get(`${path}/sweet-failure`, sweetFailure)
    .get(`${path}/:eid`, getEmoji)

export default router
