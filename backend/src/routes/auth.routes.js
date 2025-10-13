const express = require("express")
const autController = require("../controllers/auth.controller.js")

const router = express.Router()


router.post("/user/register", autController.registerUser)
router.post("/user/login", autController.loginUser)
router.post("/user/logout", autController.logoutUser)


module.exports = router