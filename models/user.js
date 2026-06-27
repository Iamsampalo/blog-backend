import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default:"user"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;