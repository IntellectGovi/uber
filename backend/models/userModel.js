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

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET , {expiresIn:"24h"});
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!candidatePassword || !this.password) {
        throw new Error("Invalid arguments for password comparison");
    }
    return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model("user" , userSchema);  

module.exports = userModel