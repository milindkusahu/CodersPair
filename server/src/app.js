const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const { connectDB } = require("./db/connect");

const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const requestRouter = require("./routes/request.routes");
const userRouter = require("./routes/user.routes");
const paymentRouter = require("./routes/payment.routes");
const chatRouter = require("./routes/chat.routes");
const initializeSocket = require("./utils/socket");

require("../src/utils/cronJob");

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://coderspair.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`✅ Server is listening at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
