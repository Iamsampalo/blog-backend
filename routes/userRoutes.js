import express from 'express';
import { deleteUser, getAllUsers, getUserById, login, signUp, updateUser } from '../controllers/userController.js';
import authorize from '../middlewares/authorize.js';
import upload from '../middlewares/upload.js';
const router = express.Router();


router.post('/', upload.single('image'), signUp)

router.post('/login', login)

router.get('/', authorize(["admin"]), getAllUsers)

router.get("/:id", getUserById)

router.delete("/:id", authorize(["admin"]), deleteUser)

router.put("/:id", authorize(["admin"]), updateUser);

export default router;