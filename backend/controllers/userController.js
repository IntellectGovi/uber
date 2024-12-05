const userModel = require("../models/userModel");
const { createUser } = require("../services/user.services");
const { validationResult } = require("express-validator");
const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const existingUser = await userModel
      .findOne({ email: new RegExp(`^${email}$`, "i") }) // Case-insensitive search
      .select("+password");

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Password is incorrect, please enter valid credentials",
      });
    }

    const token = existingUser.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      user: existingUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
