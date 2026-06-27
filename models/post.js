import mongoose from "mongoose";

const Schema = mongoose.Schema

const postSchemma = new Schema({

    title:{
        type:String,
        require:true

    },

    image:String,

    repostCount:{
        type:Number,
        default:0
    },

    body:{
        type:String,
        require:true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }

},{timestamps:true})

const Post = mongoose.model('Post', postSchemma)

export default Post;