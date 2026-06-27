const express = require ("express")
const path = require("path")
const app = express()
const port = 3400 

app.get("/", (req,res) => {
    // res.send("welcome to backend")
    res.sendFile(path.join(__dirname,"files","index.html"))
});

app.get("/about",(req,res)=>{
 res.sendFile(path.join(__dirname,"files","about.html"))
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
}) 

// const {title, body} = req.body
//         if(!title || !body){
//             return res.status(400).json({message:"All fields are required"})
//         }
//         const post = new Post({title, body})
//         await post.save()
//         return res.status(201).json({message:"Post created successfully", post})
//     } 
//     catch (error) {
//         return res.status(500).json({message:"Internal server error"})
//         console.log(error)
//     }
// }

// export {
//     createPost
// }