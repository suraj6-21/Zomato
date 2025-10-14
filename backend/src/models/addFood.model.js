const mongoose = require("mongoose");

const addFoodItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },
    video: {
      type: String,
      required: [true, "Video URL is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodpartner", 
      required: true,
    },
  },
  { timestamps: true }
);

const addFoodItemsModel = mongoose.model("FoodItem", addFoodItemsSchema);
module.exports = addFoodItemsModel;
