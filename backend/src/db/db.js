const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error details:", error.message);

    // Gracefully stop the app if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
