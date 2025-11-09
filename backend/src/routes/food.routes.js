const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware")
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middleware/auth.middleware")

// POST /api/food/ [protected]
router.post(
    "/",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);

// GET /api/food/ [protected]
router.get(
    "/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItem
)



module.exports = router;
