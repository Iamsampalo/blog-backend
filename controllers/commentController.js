import Comments from "../models/comments.js"

const createComment = async(req,res)=>{
    try {
        const {postId,authorId,content} = req.body
        const newComment = new Comments({
            postId,
            authorId:req.user.id,
            content,
        })
        await newComment.save()
        return res.status(201).json({message:"Comment created successfully", comment: newComment})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export {
    createComment,
}