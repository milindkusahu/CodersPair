const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat.model");
const ConnectionRequest = require("../models/connectionRequest.model");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:5173"
          : "https://coderspair.com",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", async ({ userId, targetUserId }) => {
      try {
        // Check if the userId and targetUserId are friends
        const connectionRequest = await ConnectionRequest.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
            { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
          ],
        });

        if (!connectionRequest) {
          socket.emit("error", {
            message: "You can only join chat rooms with connected users",
          });
          return;
        }

        const roomId = getSecretRoomId(userId, targetUserId);
        socket.join(roomId);

        // Confirm successful join
        socket.emit("joinedChat", { roomId, targetUserId });
      } catch (err) {
        socket.emit("error", {
          message: "Failed to join chat: " + err.message,
        });
      }
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);

          // Check if the userId and targetUserId are friends
          const connectionRequest = await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          });

          if (!connectionRequest) {
            socket.emit("error", {
              message: "You can only message connected users",
            });
            return;
          }

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            timeStamp: new Date(),
          });
        } catch (err) {
          socket.emit("error", { message: "ERROR : " + err.message });
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
