const router = require("express").Router();
const {body} = require("express-validator");
const {register} = require("../controllers/userController");

router.post("/register" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('fullName.firstName').isLength({min:5}).withMessage("First name must be at least 5 characters long"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),

] , register);


module.exports = router;