const express = require("express");
const app = express();
const PORT = 3000;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { userAuth } = require("./middleware/auth");

const { connectDB } = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("./models/user.model");
const { validateSignUpData } = require("./utils/validations");

// It will be run for all Routes
// Converts JSON Object to JS Object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    // const passwordHash = await bcrypt.hash(password, 10); // pre-save hook will handle hashing

    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password); // returns boolean

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      }); // { httpOnly: true }
      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
