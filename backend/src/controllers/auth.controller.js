const userModel = require("../models/user.models.js")
const foodpartnerModel = require("../models/foodPartner.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// Register new User
async function registerUser(req, res) {

    const { fullname, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res
            .status(400)
            .json({
                message: "User already exists"
            });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000 
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

// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if email & password are provided
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // 2️⃣ Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({
                    message: "Invalid email or password"
                });
        }

        // 3️⃣ Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({
                    message: "Invalid email or password"
                });
        }

        // 4️⃣ Generate JWT token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

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

// Logout User
function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
    });

    return res
        .status(200)
        .json({
            message: "Logout successful"
        });
}

// Register new food partner
async function registeredFoodPartner(req, res) {
    try {
        const { name, email, password, phone, contactName, address } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({
                    message: "All fields are required"
                });
        }

        // 2️⃣ Check if account already exists
        const existingPartner = await foodpartnerModel.findOne({ email });

        if (existingPartner) {
            return res
                .status(400)
                .json({
                    message: "Account already exists"
                });
        }

        // 3️⃣ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4️⃣ Create new partner
        const newfoodPartner = await foodpartnerModel.create({
            name,
            email,
            contactNumber: phone,
            address,
            contactName,
            password: hashedPassword,
        });

        // 5️⃣ Generate JWT token
        const token = jwt.sign({
            id: newfoodPartner._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "Food partner registered successfully",
            foodPartner: {
                _id: newfoodPartner._id,
                name: newfoodPartner.name,
                email: newfoodPartner.email,
                phone: newfoodPartner.contactNumber,
                address: newfoodPartner.address,
                contactName: newfoodPartner.contactName,
            },
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res
            .status(500)
            .json({
                message: "Server error, please try again later"
            });
    }
}

// Login food partner
async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // 2️⃣ Find partner by email
        const partner = await foodpartnerModel
            .findOne({ email })
            .select("+password");

        if (!partner) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Debugging: Check if password exists
        // console.log("Partner object:", partner);
        if (!partner.password) {
            console.error("Partner password is undefined");
            return res
                .status(500)
                .json({
                    message: "Server error, please try again later"
                });
        }

        // 3️⃣ Compare password
        const isPasswordValid = await bcrypt.compare(password, partner.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({
                    message: "Invalid email or password"
                });
        }

        // 4️⃣ Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return res
                .status(500)
                .json({
                    message: "Server configuration error"
                });
        }

        // 5️⃣ Generate JWT token
        const token = jwt.sign({
            id: partner._id
        }, process.env.JWT_SECRET);

        // 6️⃣ Send token in HTTP-only cookie
        res.cookie("token", token)

        // 7️⃣ Send response
        return res.status(200).json({
            success: true,
            message: "Food partner logged in successful",
            partner: {
                _id: partner._id,
                name: partner.name,
                email: partner.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500)
            .json({
                message: "Server error, please try again later"
            });
    }
}

// Logout foodPartner 
function logoutFoodPartner(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Food Partner logout successful",
        });
    } catch (error) {
        console.error("Logout Error:", error.message);
        return res
            .status(500)
            .json({
                message: "Server error, please try again later"
            });
    }
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registeredFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}