const userModel = require("../models/user.models.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secure = "5fdc4caaf31632871dc0318ee80f3ad2"

async function registerUser(req, res) {

    const { fullname, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword);

    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, secure)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",     // protects against CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expires in 7 days
    })
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function loginUser(req, res) {

}

async function logoutUser(req, res) {

}

module.exports = { registerUser, loginUser, logoutUser }