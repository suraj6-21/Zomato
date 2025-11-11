const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes.js")
const foodRoutes = require("./routes/food.routes.js")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("Hloo")
})

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)


module.exports = app