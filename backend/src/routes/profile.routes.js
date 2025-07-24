const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const {
  validateEditProfileData,
  validateEditProfilePassword,
} = require("../utils/validations");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ message: "Profile updated Successfully!!!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateEditProfilePassword(req);

    const loggedInUser = req.user;
    const { currentPassword, newPassword } = req.body;

    const isMatch = await loggedInUser.validatePassword(currentPassword);

    if (!isMatch) {
      throw new Error("Current password is incorrect.");
    }

    loggedInUser.password = newPassword;

    await loggedInUser.save();
    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
