const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const ConnectionRequest = require("../models/connectionRequest.model");
const { User } = require("../models/user.model");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // Loggedin User
    const { toUserId, status } = req.params;

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json({ message: `Invaid Request` });
    }

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: `Invaid Status type: ${status}` });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: `User not found!` });
    }

    if (fromUserId === toUserId) {
      return res.status(400).json({ message: `Invaid Request` });
    }

    // Check if there is an exisitng connectionRequest
    const exisitngConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (exisitngConnectionRequest) {
      return res
        .status(400)
        .send({ message: "Connection request already exists!!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Connection request sent Successfully!",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
