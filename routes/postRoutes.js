import express from 'express';
import authorize from '../middlewares/authorize.js';
import { createPost } from '../controllers/postController.js';


const router = express.Router();


router.post('/createPost', authorize(["admin","user"]), createPost)





export default router;