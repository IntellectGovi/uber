const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captainController");
const { captainAuthMiddleware } = require("../middlewares/auth.middleware");
const blacklistToken = require("../models/blacklistToken.model");


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 4 }).withMessage('First name must be at least 5 characters long').trim().escape().withMessage('Invalid first name'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    captainController.login 
)

router.get("/getCaptain" , captainAuthMiddleware , (req , res) => {
    res.send(req.captain);
})

router.get("/logout" , captainAuthMiddleware , (req , res) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    blacklistToken.create({token});
    res.send("Logged out successfully");
})

module.exports = router;