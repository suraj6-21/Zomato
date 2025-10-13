const userModel = require("../models/user.models.js")

async function registerUser(req, res) {

    const { fullname, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    
}