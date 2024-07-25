const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const ordersModel = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  total_amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default:"Pending",
    enum: ['Pending', 'Shipped',"Delivered",'Cancelled'],
  },
  items: [productSchema],
});
        
const  Orders = mongoose.model("Orders", ordersModel);
module.exports = Orders;