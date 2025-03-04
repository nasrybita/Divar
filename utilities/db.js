"use strict";

const mongoose = require("mongoose");
require("dotenv").config();

// Define the logError function
const logError = (err) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);
};

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

// Handle connection errors
mongoose.connection.on("error", (err) => {
  logError(err);
});

module.exports = connectDB;
