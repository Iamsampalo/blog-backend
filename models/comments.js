import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    content: {
        type: String,
        require: true
    },

    
}, {
    timestamps: true
})

const Comments = mongoose.model('Comments', commentSchema)

export default Comments;