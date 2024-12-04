const router = require("express").Router();
const {body} = require("express-validator");
const {login , register} = require("../controllers/userController");
const {authMiddleware} = require("../middlewares/auth.middleware");
const blacklistToken = require("../models/blacklistToken.model");

router.post("/register" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('fullName.firstName').isLength({min:5}).withMessage("First name must be at least 5 characters long"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),

] , register);

router.post("/login" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),
] ,login)

router.get("/getUser" , authMiddleware ,(req ,res) => {
    res.send(req.user);
})

router.get("/logout" , authMiddleware , async (req , res) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistToken.create({token});

    res.send("Logged out successfully");
})


module.exports = router;