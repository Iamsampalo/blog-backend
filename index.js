let fs = require('fs');

// fs.writeFile('obi.txt',"hello there",()=>{
//     console.log("file written")
// })

// fs.readFile('obi.txt',(err,data)=>{
//     if (err) {
//         throw new err
//     }

//     console.log(data.toString())
// })

// fs.unlink('obi.txt',(err,data)=>{
//     if (err) {
//         throw new err
//     }

//     console.log("file deleted successfully")
// })

// fs.mkdir('docs',()=>{
//     console.log("folder created")
// })
// fs.mkdir( 'docs', ()=>{
//     console.log("folder ready to read")
// })

// fs.writeFile('docs/obi.txt',"hello there here is my backend class",()=>{
//     console.log("file written")
//  })
// let os = require('os');
// console.log(os.platform())

const http = require('http');
const path = require('path')

const server = http.createServer((req,res)=>{
    let filePath = ""

    if (req.url == "/") {
        filePath =  path.join(__dirname,"files", "index.html")
        fs.readFile(filePath, (err,data)=>{
            if (err) {
                throw new err
            }

            res.end(data)
        })        
    }else if(req.url == "/about"){
        filePath =  path.join(__dirname,"files", "about.html")
        fs.readFile(filePath,(err,data)=>{
            if(err){
                throw new err
            }
            res.end(data)
        })       
    }
})


server.listen(2000,()=>{
    console.log('server is running on port 2000')
})