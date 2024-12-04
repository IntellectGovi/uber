const userModel = require("../models/userModel");
const {createUser} = require("../services/user.services");
const {validationResult} = require("express-validator");
const register = async (req , res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
 

        const {fullName , email , password} = req.body;

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

const login = async(req , res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email , password} = req.body;
        const existingUser = await userModel.findOne({email}).select("+password");
        
        if (!password || !existingUser.password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        

        if(!existingUser){
            return res.status(400).json({error:"User does not exist"});
        }
    
        const isPasswordCorrect = await existingUser.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                error:"Password is incorrect please enter valid credentials",
            })
        }
    
        const token = existingUser.generateAuthToken();
    
        return res.status(200).json({
            success:true,
            user:existingUser,
            token
        })
    } catch (error) {
        console.log(error)
    }


}

module.exports = {register , login};