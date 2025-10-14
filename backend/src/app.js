const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes.js")
const foodRoutes = require("./routes/food.route.js")

const app = express()

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("Hloo")
})

app.use("/api/auth", authRoutes)
app.use("/api/foof", foodRoutes)


module.exports = app