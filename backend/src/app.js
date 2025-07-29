const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDB } = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const requestRouter = require("./routes/request.routes");
const userRouter = require("./routes/user.routes");

// It will be run for all Routes
// Converts JSON Object to JS Object
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is listening at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
