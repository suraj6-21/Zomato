const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/food-view");
    console.log("✅ MongoDB connected successfully!");

  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error details:", error.message);

    // Gracefully stop the app if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
