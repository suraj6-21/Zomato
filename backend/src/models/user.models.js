const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   fullname: { 
        type: String,
        // required: true, 
        // required: [true, "Full name is required"], 

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        // minlength: 6,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel
