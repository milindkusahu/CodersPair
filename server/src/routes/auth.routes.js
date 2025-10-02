const express = require("express");

const router = express.Router();

const { User } = require("../models/user.model");
const { validateSignUpData } = require("../utils/validations");

router.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const isUserPresent = await User.findOne({ emailId: emailId });

    if (isUserPresent) {
      throw new Error("User already exist!!!");
    }

    // Encrypt the password
    // const passwordHash = await bcrypt.hash(password, 10); // pre-save hook will handle hashing

    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password); // returns boolean

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      }); // { httpOnly: true }
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("Logout Successfull!!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
