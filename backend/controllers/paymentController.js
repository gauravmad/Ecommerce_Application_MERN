const asyncHandler = require("express-async-handler");
const Payments = require("../models/paymentModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const makePayment = asyncHandler(async (req, res) => {
  try {
    const { order_id, payment_method, payment_status, transaction_id, amount } =
      req.body;

    if (
      !order_id ||
      !payment_method ||
      !payment_status ||
      !transaction_id ||
      !amount
    ) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const payment = await Payments.create({
      order_id,
      payment_method,
      payment_status,
      transaction_id,
      amount,
    });
    if (payment) {
      successResponse({
        res,
        message: "Payment successfully",
        data: payment,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const edit = asyncHandler(async (req, res) => {
  try {
    const { order_id, payment_method, payment_status, transaction_id, amount } =
      req.body;

    if (!order_id || !payment_method || !payment_status || !amount) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const payment = await Payments.findByIdAndUpdate(
      req.params.id,
      {
        order_id: order_id,
        payment_method: payment_method,
        payment_status: payment_status,
        transaction_id: transaction_id,
        amount: amount,
      },
      {
        new: true,
      }
    );
    if (payment) {
      successResponse({
        res,
        message: "Payment updated successfully",
        data: payment,
      });
    } else {
      errorResponse({ res, message: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});
const find = asyncHandler(async (req, res) => {
  try {
    const payment = await Payments.findById(req.params.id);
    if (payment) {
      successResponse({
        res,
        message: "Payment fetched successfully",
        data: payment,
      });
    } else {
      errorResponse({ res, message: "Payment not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const payment = await Payments.find();
    if (payment) {
      successResponse({
        res,
        message: "Payment fetched successfully",
        data: payment,
      });
    } else {
      errorResponse({ res, message: "No Payment data!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const order = asyncHandler(async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const createdOrder = await razorpay.orders.create(options);
    
    if (createdOrder && createdOrder.id) {
      successResponse({
        res,
        message: "Payment Order Created successfully",
        data: createdOrder,
      });
    } else {
      errorResponse({ res, message: "Error In Create Payment Order!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const validatePayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex"); 
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = { makePayment, find, getAll, edit, order,validatePayment };
