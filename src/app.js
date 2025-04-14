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
