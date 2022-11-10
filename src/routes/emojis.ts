import { Router } from 'oak'
import { getEmoji, getEmojis, sweetFailure } from 'controllers/emojis.ts'

const router = new Router()
const path = '/emojis'

router
    .get(`${path}`, getEmojis)
    .get(`${path}/:eid`, getEmoji)
    .get(`${path}/sweet-failure`, sweetFailure)

export default router
