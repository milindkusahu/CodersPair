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
  try {
    const user = new User(req.body);

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
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
  try {
    const allUser = await User.find({});
    res.send(allUser);
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete({ _id: userId });
    res.send("User is Deleted Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedData = req.body;
    await User.findByIdAndUpdate({ _id: userId }, updatedData, {
      returnDocument: "after",
    });
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!");
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
