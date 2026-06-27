import express from 'express'

import authorize from '../middlewares/authorize.js'
import { createRepost } from '../controllers/repostController.js'

const router = express.Router()

router.post('/createRepost', authorize(["admin","user"]), createRepost)


export default router
