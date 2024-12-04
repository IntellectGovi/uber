const captainService = require("../services/captain.service");
const captainModel = require("../models/captainModel");
const { validationResult } = require("express-validator");
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Captain does not exist" });
    } else {
      const isPasswordCorrect = await captain.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const token = captain.generateAuthToken();
      res.cookie("token", token);
      return res.status(200).json({
        success:true,
        captain:captain,
        token
    })
    }
  } catch (error) {
    console.log("Error while logging in: ", error);
  }
};
