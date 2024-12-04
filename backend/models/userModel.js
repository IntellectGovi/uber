const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            required:true,
            minLen : [5 , "First name must be at least 5 characters long"]
        },
        lastName:{
            type:String,
            required:false,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
        select:false,
    }
})

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async (password) => {
    await bcrypt.compare(password , this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model("user" , userSchema);  

module.exports = userModel