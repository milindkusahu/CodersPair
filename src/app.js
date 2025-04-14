const express = require("express");
const app = express();
const PORT = 3000;

const { connectDB } = require("./db/connect");

const dotenv = require("dotenv");
dotenv.config();

const { User } = require("./models/user.model");

// It will be run for all Routes
// Converts JSON Object to JS Object
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

app.get("/feed", async (req, res) => {
  const allUser = await User.find({});
  try {
    res.send(allUser);
  } catch (err) {
    res.status(400).send("Something went wrong");
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
