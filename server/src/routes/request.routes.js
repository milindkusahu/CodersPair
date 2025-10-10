const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const ConnectionRequest = require("../models/connectionRequest.model");
const { User } = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");
const {
  newConnectionRequestTemplate,
  connectionAcceptedTemplate,
} = require("../utils/emailTemplates");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // Loggedin User
    const { toUserId, status } = req.params;

    // Already handled using .pre in Schema
    // if (fromUserId.toString() === toUserId.toString()) {
    //   return res.status(400).json({ message: `Invalid Request` });
    // }

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid Status type: ${status}` });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: `User not found!` });
    }

    // Check if there is an existing connectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
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

    try {
      const htmlBody = newConnectionRequestTemplate(
        req.user.firstName,
        toUser.firstName,
      );
      const textBody = `${req.user.firstName} wants to connect with you on CodersPair. Login to view the request.`;

      await sendEmail.run(
        toUser.emailId,
        `New connection request from ${req.user.firstName}`,
        htmlBody,
        textBody,
      );
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError.message);
    }

    res.json({
      message: "Connection request sent Successfully!",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const LoggedInUser = req.user;
      const { status, requestId } = req.params;

      // Validate the status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      // Milind => Elon
      // Is Elon LoggedIn => toUserId
      // status = interested
      // request Id should be valid
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: LoggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      // Send email notification if connection was accepted
      if (status === "accepted") {
        try {
          await connectionRequest.populate("fromUserId");
          const fromUser = connectionRequest.fromUserId;

          const htmlBody = connectionAcceptedTemplate(
            LoggedInUser.firstName,
            fromUser.firstName,
          );
          const textBody = `${LoggedInUser.firstName} accepted your connection request on CodersPair!`;

          await sendEmail.run(
            fromUser.emailId,
            `${LoggedInUser.firstName} accepted your connection request!`,
            htmlBody,
            textBody,
          );
        } catch (emailError) {
          console.error("Failed to send acceptance email:", emailError.message);
        }
      }

      res.json({ message: `Connection request ${status}`, data: data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

module.exports = router;
