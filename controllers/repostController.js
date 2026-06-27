import Repost from "../models/repost.js";
import Post from "../models/post.js";

const createRepost = async(req,res)=>{
    try {
        const {userId,postId} = req.body
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({message:"Post not found"})
        }
        const repostExist = await Repost.findOne(userId,postId)
        if (repostExist) {
            return res.status(400).json({message:"Already repost"})
        }
        // create repost
        await Repost.create({userId,postId})

        // update repost count
        await Repost.findByIdAndUpdate(postId, {
            $inc: { repostCount: 1 }
        })
        res.status(201).json({message:"Repost created successfully"});
    }  catch (error) {
         return res.status(500).json({message:"Internal server error"})
         console.log(error)
     }

} 
const deleteRepost = async(req,res)=>{
    try {
        const {userId,postId} = req.body
        const repost = await Repost.findOneAndDelete({userId,postId})
        if (!repost) {
            return res.status(404).json({message:"Repost not found"})
        }
        // update repost count
        await Repost.findByIdAndUpdate(postId, {
            $inc: { repostCount: -1 }
        })

        res.status(200).json({message:"Repost deleted successfully"});
    
    }  catch (error) {
         return res.status(500).json({message:"Internal server error"})
         console.log(error)
     }

} 

export {
    createRepost,
    deleteRepost,
}