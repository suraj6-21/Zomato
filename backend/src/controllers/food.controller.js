const foodModel = require("../models/addFood.model")
const storageService = require("../services/storage.services")
const multer = require("multer"); 
const { nanoid } = require('nanoid');
const uniqueId = nanoid();

async function createFood(req, res) {

    // console.log("DATA", req.body);
    // console.log("File", req.file);

    if (!req.file) {
        return res
            .status(400)
            .json({ error: "No file uploaded !!" });
    }

    // Upload image to ImageKit
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uniqueId);

    // You can now save it to MongoDB
    const foodItems = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        videoUrl: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "Food item created successfully",
        food: foodItems,
        videoUrl: fileUploadResult.url,
    });
}

module.exports = { createFood };