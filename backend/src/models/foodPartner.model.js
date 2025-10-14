const mongoose = require("mongoose");


const foodPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            // minlength: [6, "Password must be at least 6 characters"],
            // select: false, // hides password in queries
        },
    },
    {
        timestamps: true,
    }
);

const foodpartnerModel = mongoose.model("foodpartner", foodPartnerSchema);
module.exports = foodpartnerModel