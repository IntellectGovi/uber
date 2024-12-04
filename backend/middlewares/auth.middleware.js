const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const blacklistToken = require("../models/blacklistToken.model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isBlacklisted = await blacklistToken.findOne({ token });

    if(isBlacklisted){
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = await jwt.decode(token, process.env.JWT_SECRET);


    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {authMiddleware}
