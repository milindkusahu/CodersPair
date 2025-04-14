const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✨ Connected to DB...`);
  } catch (error) {
    console.log("MONGODB connection error: ", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
