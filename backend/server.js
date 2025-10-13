const app = require("./src/app.js")
const connectDB = require("./src/db/db.js")

const PORT = process.env.PORT || 3000;

// First connect to DB, then start the server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
})();
