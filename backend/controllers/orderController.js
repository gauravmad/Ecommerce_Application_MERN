const asyncHandler = require("express-async-handler");f
const Orders = require("../models/orderModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");


const placeOrder = asyncHandler(async (req, res) => {
    try {
        const { user_id, total_amount, status,items,order_date} =
          req.body;
    
        if (!user_id  || !total_amount ||!items ) {
          errorResponse({ res, message: "Please fill required fields!" });
        }
    
        const order = await Orders.create({
            user_id, order_date, total_amount, status,items,
        });
        if (order) {
          successResponse({
            res,
            message: "Order Placed successfully",
            data: order,
          });
        }
      } catch (error) {
        console.log(error);
        errorResponse({ res, message: "Something went wrong!" });
      }
  });
  
  const find = asyncHandler(async (req, res) => {
    try {
      const order = await Orders.findById(req.params.id);
      if (order) {
        successResponse({
          res,
          message: "Order fetched successfully",
          data: order,
        });
      } else {
        errorResponse({ res, message: "order not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

const  getAll=asyncHandler(async(req,res)=>{
    try {
        const orders = await Orders.find();
        if (orders) {
          successResponse({
            res,
            message: "Orders fetched successfully",
            data: orders,
          });
        } else {
          errorResponse({ res, message: "No Orders data!" });
        }
      } catch (error) {
        console.log(error);
        errorResponse({ res, message: "Something went wrong!" });
      }
  })
  
  const edit = asyncHandler(async (req, res) => {
    try {
      const {  user_id, total_amount, status,items,order_date} =
        req.body;
  
      if (!user_id  || !total_amount ||!items ) {
        errorResponse({ res, message: "Please fill required fields!" });
      }
  
      const order = await Orders.findByIdAndUpdate(
        req.params.id,
        {
          user_id:user_id,
          total_amount:total_amount,
          status:status,
          items:items,
          order_date:order_date,
        },
        {
          new: true,
        }
      );
      if (order) {
        successResponse({
          res,
          message: "Order updated successfully",
          data: order,
        });
      } else {
        errorResponse({ res, message: "Order not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

  
  module.exports = { placeOrder,find,getAll,edit};