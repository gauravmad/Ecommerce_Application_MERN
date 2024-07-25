const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default: [] 
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    stock_quantity:{
      type:Number,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", productModel);
module.exports = ProductModel;
