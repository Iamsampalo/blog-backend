import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

const Repost = mongoose.model('Repost', repostSchema);

export default Repost;