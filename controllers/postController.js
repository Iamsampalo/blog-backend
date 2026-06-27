import Post from "../models/post.js";

const createPost = async(req,res)=>{
    try {
        const {title,body} = req.body
        if (!title || !body) {
            return res.status(400).json({message:"All field required"})
        }
        const post = new Post({
            title,
            body,
            authorId: req.user.id
        })
        await post.save()
        return res.status(201).json({message:"Post saved Sucessfully",post})
    } catch (error){
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

export {
    createPost,
}