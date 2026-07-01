import express from 'express';
import path from 'path';
import { deleteUser, getAllUsers, getUserById, login, signUp } from './controllers/userController.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createPost } from './controllers/postController.js';
import { createComment } from './controllers/commentController.js';
import { createRepost, deleteRepost } from './controllers/repostController.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js'
import repostRoutes from './routes/repostRoutes.js'
import authorize from './middlewares/authorize.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
const app = express();
const port = process.env.PORT || 3700;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB"))
.catch((error)=> console.log("Error connecting to MongoDB", error));


app.use('/api/users', userRoutes);



app.use('/api/post', postRoutes)

app.use('/api/comments', commentsRoutes)

app.use('/api/repost', repostRoutes)

app.delete('/api/repost/deleteRepost', deleteRepost)

app.get("/", (req,res) => {
    res.sendFile(path.join(path.resolve(), "files", "index.html"))
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})