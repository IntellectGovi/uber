const userModel = require("../models/userModel");
const createUser = async ({fullName, email , password}) => {
    
    if(!fullName.firstName || !email || !password){
        return res.status(400).json({error:"Please enter all the fields"});
    }

    console.log( "console from the createUser function",fullName.firstName , fullName.lastName , email , password);


    const user = await userModel.create({fullname:{
        firstName:fullName.firstName,
        lastName:fullName.lastName,
    } , email , password});

    return user;
}



module.exports = {createUser};