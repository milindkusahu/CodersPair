const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log("Sending a connection request");

    res.send(user.firstName + "sent the connection request!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
