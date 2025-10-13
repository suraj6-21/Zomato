const userModel = require("../models/user.models.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


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
    }, process.env.JWT_SECRET)

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
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if email & password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2️⃣ Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3️⃣ Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4️⃣ Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5️⃣ Send token in HTTP-only cookie
        res
            .status(200)
            .cookie("token", token)
            .json({
                success: true,
                message: "Login successful",
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                },
            });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
}


async function logoutUser(req, res) {

}

module.exports = { registerUser, loginUser, logoutUser }