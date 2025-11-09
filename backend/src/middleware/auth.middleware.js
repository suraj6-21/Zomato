const foodpartnerModel = require("../models/foodPartner.model.js")
const userModel = require("../models/user.models.js")
const jwt = require("jsonwebtoken");


async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies?.token;

    // 🔒 Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Find food partner by ID from decoded token
        const foodPartner = await foodpartnerModel.findById(decoded.id).select("-password");

        if (!foodPartner) {
            return res.status(401).json({
                success: false,
                message: "Invalid token or user no longer exists",
            });
        }

        // ✅ Attach partner to request for later use
        req.foodPartner = foodPartner;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized or invalid token",
        });
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401)
            .json({
                message: "Please login first"
            })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        req.user = user
        next()
        
    } catch (error) {
       return res.status(401).json({
        message: "Invalid token"
       })
    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
};
