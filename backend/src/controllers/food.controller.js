const foodModel = require("../models/foodPartner.model")
const storageService = require("../services/storage.services")


async function createFood(req, res) {
    const { v4: uuid } = await import("uuid");

    if (!req.file) {
        return res
            .status(400)
            .json({ error: "No file uploaded !!" });
    }

    // Upload image to ImageKit
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

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