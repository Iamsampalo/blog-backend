import { config } from "dotenv"
config()
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls:{
        rejectUnauthorized: false
    }
})

const signUp = async(req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body;

        let ImageUrl = req.file ? req.file.path : null


        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: ImageUrl
        })

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: "Welcome to Our App 🎉",
//             html: `
// <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
  
//   <!-- Header -->
//   <div style="background:#4f46e5;padding:20px;text-align:center;color:#ffffff;">
//     <h1 style="margin:0;font-size:22px;">Welcome to Our App 🚀</h1>
//   </div>

//   <!-- Body -->
//   <div style="padding:30px;color:#333333;line-height:1.6;">
//     <h2 style="margin-top:0;">Hi ${user.firstName},</h2>

//     <p>
//       We’re excited to have you on board! Your account has been successfully created and you’re now part of our growing community.
//     </p>

//     <p>
//       You can now explore all our features and get started right away.
//     </p>

//     <!-- Button -->
//     <div style="text-align:center;margin:30px 0;">
//       <a href="#" 
//          style="background:#4f46e5;color:#ffffff;padding:12px 25px;
//          text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
//         Get Started
//       </a>
//     </div>

//     <p>
//       If you have any questions, feel free to reach out — we’re always here to help.
//     </p>

//     <p style="margin-bottom:0;">
//       Cheers,<br/>
//       <strong>The Our App Team</strong>
//     </p>
//   </div>

//   <!-- Footer -->
//   <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777;">
//     © ${new Date().getFullYear()} Our App. All rights reserved.
//   </div>

// </div>`
//         }

//         const info = await transporter.sendMail(mailOptions);
//         console.log(info.response);

        return res.status(201).json({message:"User created successfully", user})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const login =async(req,res)=>{
    try {
        let {email, password} = req.body

        let user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({message:"email does not exists"})
        }

        let checkPassword = await bcrypt.compare(password, user.password) 

        if(!checkPassword){
            return res.status(404).json({message:"incorrect password"})
        }

        let token = jwt.sign({id:user._id, role: user.role},process.env.SECRETKEY, {expiresIn:'1h'});
       res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 1000 // 1 hour
            });

        res.status(200).json({message:"sign in successful!", token})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({message:"No users found"})
        }
        return res.status(200).json({message:"Users retrieved successfully", users})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const getUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"User retrieved successfully", user})


    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"User deleted successfully", user})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const updateUser = async(req,res)=>{
    try {
        const {id} = req.params
        const {firstName, lastName, email, role} = req.body
        const user = await User.findByIdAndUpdate(id, {firstName, lastName, email, role}, {new: true})
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"User updated successfully", user})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

export {
    signUp,
    getAllUsers,
    getUserById,
    deleteUser, 
    login,
    updateUser
}