const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/upload.middleware")
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middleware/auth.middleware")


router.post("/",
    // authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);




module.exports = router;
