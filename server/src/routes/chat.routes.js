const express = require("express");
const router = express.Router();
const { Chat } = require("../models/chat.model");
const ConnectionRequest = require("../models/connectionRequest.model");
const { userAuth } = require("../middleware/auth.middleware");

router.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    // Check if users are connected
    const connectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
        { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
      ],
    });

    if (!connectionRequest) {
      return res.status(403).json({
        msg: "You can only chat with connected users",
      });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
