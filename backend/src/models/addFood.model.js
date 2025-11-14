const mongoose = require("mongoose");

const addFoodItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
    },

    videoUrl: {
      type: String,
      // required: [true, "Video URL is required"],
    },

    description: {
      type: String,
    },

    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodpartner",
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0
    },

    savesCount: {
      type: Number,
      default: 0
    }
  },
);

const addFoodItemsModel = mongoose.model("foodItem", addFoodItemsSchema);
module.exports = addFoodItemsModel;
