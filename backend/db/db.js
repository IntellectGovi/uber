const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the database");
    }catch(error){
        console.log(" The error in connecting to the database is : ", error);
    }
}

module.exports = { connectDb };
