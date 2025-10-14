const express = require("express")
const autController = require("../controllers/auth.controller.js")

const router = express.Router()

// user auth APIs 
router.post("/user/register", autController.registerUser)
router.post("/user/login", autController.loginUser)
router.get("/user/logout", autController.logoutUser)

// foodPartner auth APIs
router.post("/food-partner/register", autController.registeredFoodPartner)
router.post("/food-partner/login", autController.loginFoodPartner)
router.get("/food-partner/logout", autController.logoutFoodPartner)


module.exports = router