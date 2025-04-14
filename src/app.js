const express = require("express");
const app = express();
const { connectDB } = require("./db/connect");
const dotenv = require("dotenv");

const { User } = require("./models/user.model");

dotenv.config();

const PORT = 3000;

app.post("/signup", async (req, res) => {
  const user = new User({
    username: "1",
    firstName: "Milind",
    lastName: "Sahu",
    emailId: "milindsahu2000@gmail.com",
    password: "milind123",
  });

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

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
