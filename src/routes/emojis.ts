import { Router } from 'oak'
import { getEmojis } from 'controllers/emojis.ts'

const router = new Router()
const path = '/emojis'

router.get(`${path}`, getEmojis)
router.get(`${path}/sweet-failure`, (ctx, _next) => {
    ctx.throw(500, "That's suppose to happen don't worry 🍦")
})

export default router
