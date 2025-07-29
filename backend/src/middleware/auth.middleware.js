const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login Again!!");
    }

    // Validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    // Find the user in DB
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
