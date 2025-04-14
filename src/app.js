const express = require("express");
const app = express();
const { connectDB } = require("../db/connect");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3000;

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
