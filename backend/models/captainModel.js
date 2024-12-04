const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");


const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLen: [5, "First name must be at least 5 characters long"],
        },
        lastName: {
            type: String,
            required: false,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle:{
        color: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            minLen: [1, "Capacity must be at least 1 person"],
        },
        plate: {
            type: String,
            required: true,
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ["motorcycle", "car", "auto"],
            default: "motorcycle"
        }
    },

    location:{
        lat:{
            type: Number,
        },
        long:{
            type: Number,
        }
    }

});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};


captainSchema.methods.comparePassword = async function (candidatePassword) {
    if (!candidatePassword || !this.password) {
        throw new Error("Invalid arguments for password comparison");
    }
    return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const captainModel= mongoose.model("captain", captainSchema);  

module.exports = captainModel;