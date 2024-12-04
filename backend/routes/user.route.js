const router = require("express").Router();
const {body} = require("express-validator");
const {login , register} = require("../controllers/userController");

router.post("/register" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('fullName.firstName').isLength({min:5}).withMessage("First name must be at least 5 characters long"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),

] , register);

router.post("/login" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),
] ,login)


module.exports = router;