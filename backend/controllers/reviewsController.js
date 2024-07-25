const asyncHandler=require("express-async-handler");
const Reviews =require("../models/reviewsModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");

const create = asyncHandler(async (req, res) => {
    try {
      const { user_id, product_id, rating,description} =
        req.body;
  
      if (!user_id || !product_id || !rating || !description) {
        errorResponse({ res, message: "Please fill required fields!" });
      }
  
      const reviews = await Reviews.create({
        user_id,
        product_id,
        rating,
        description,
      });
      if (reviews) {
        successResponse({
          res,
          message: "Reviews Add successfully",
          data: reviews,
        });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });
  
  const edit = asyncHandler(async (req, res) => {
    try {
      const {  user_id, product_id, rating,description } =
        req.body;
  
      if (!user_id || !product_id || !rating || !description) {
        errorResponse({ res, message: "Please fill required fields!" });
      }
  
      const review = await Reviews.findByIdAndUpdate(
        req.params.id,
        {
          user_id:user_id,
          product_id:product_id,
          rating:rating,
          description:description,
        },
        {
          new: true,
        }
      );
      if (review) {
        successResponse({
          res,
          message: "Review updated successfully",
          data: review,
        });
      } else {
        errorResponse({ res, message: "Review not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

  
const getSingle = asyncHandler(async (req, res) => {
    try {
      const review = await Reviews.findById(req.params.id);
      if (review) {
        successResponse({
          res,
          message: "Review fetched successfully",
          data: review,
        });
      } else {
        errorResponse({ res, message: "Review not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

const getAll = asyncHandler(async (req, res) => {
    try {
      const reviews = await Reviews.find();
      if (reviews) {
        successResponse({
          res,
          message: "reviews fetched successfully",
          data: reviews,
        });
      } else {
        errorResponse({ res, message: "No reviews data!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

  const remove = asyncHandler(async (req, res) => {
    try {
      const reviewId = req.params.id;
  
      const review = await Reviews.findById(reviewId);
      if (!review) {
        return errorResponse({ res, message: "Review not found!" });
      }
  
      await review.deleteOne();
  
      successResponse({
        res,
        message: "Review removed successfully",
        data: { reviewId },
      });
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });
  
module.exports = { create,getSingle,getAll,edit,remove};
