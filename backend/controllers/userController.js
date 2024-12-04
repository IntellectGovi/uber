const userModel = require("../models/userModel");
const {createUser} = require("../services/user.services");
const {validationResult} = require("express-validator");
const register = async (req , res) => {
    try {
        console.log("Console from the register route" , req.body);

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
 

        const {fullName , email , password} = req.body;
        console.log("console log from the register01 route",fullName , email , password) 

        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({fullName , email , password:hashedPassword});

        const token = user.generateAuthToken();



        return res.status(200).json({
            success:true,
            user,
            token,
        })
        

    } catch (error) {
        console.log(error);
    }
}

module.exports = {register};