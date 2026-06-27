import express, { Router } from 'express'
import authorize from '../middlewares/authorize.js'
import { createComment } from '../controllers/commentController.js'

const router = express.Router()

router.post('/createComment', authorize(["admin","user"]), createComment)



export default router