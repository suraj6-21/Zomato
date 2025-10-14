require("dotenv").config();
const app = require("./src/app.js")
const connectDB = require("./src/db/db.js")

const Port = process.env.PORT || 8000;

// First connect to DB, then start the server
(async () => {
  try {
    await connectDB();
    app.listen(Port, () => {
      console.log(`🚀 Server running at http://localhost:${Port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
})();
