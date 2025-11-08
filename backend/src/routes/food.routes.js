const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware")
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middleware/auth.middleware")


router.post(
    "/add",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);



module.exports = router;
