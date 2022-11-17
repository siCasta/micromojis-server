import { Router } from 'oak'

import { welcome } from 'controllers/index.ts'

const router = new Router()
const subRouter = new Router()

subRouter.get('/', welcome)

router.use('/', subRouter.routes())

export default router
