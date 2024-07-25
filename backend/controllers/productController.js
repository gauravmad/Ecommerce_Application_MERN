const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");

const create = asyncHandler(async (req, res) => {
  try {
    const { name, images, description, price,category, brand, stock_quantity,size } =
      req.body;

    if (!name || !images || !description || !price ||!category ||!stock_quantity || !size) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const product = await Product.create({
      name,
      images,
      description,
      price,
      category,
      brand,
      stock_quantity,
      size
    });
    if (product) {
      successResponse({
        res,
        message: "Product created successfully",
        data: product,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return errorResponse({ res, message: "Product not found!" });
    }

    // Remove the product
    await product.deleteOne();

    successResponse({
      res,
      message: "Product removed successfully",
      data: { productId },
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const edit = asyncHandler(async (req, res) => {
  try {
    const {  name, images, description, price,category, brand, stock_quantity,size } =
      req.body;

    if (!name || !images || !description || !price ||!category ||!stock_quantity || !size) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name:name,
        images:images,
        description:description,
        price:price,
        category:category,
        stock_quantity:stock_quantity,
        size:size
      },
      {
        new: true,
      }
    );
    if (product) {
      successResponse({
        res,
        message: "Product updated successfully",
        data: product,
      });
    } else {
      errorResponse({ res, message: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getSingle = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      successResponse({
        res,
        message: "Product fetched successfully",
        data: product,
      });
    } else {
      errorResponse({ res, message: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    if (product) {
      successResponse({
        res,
        message: "Products fetched successfully",
        data: product,
      });
    } else {
      errorResponse({ res, message: "No Products data!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getRelatedProduct = asyncHandler(async (req, res) => {
  try {
    console.log(req.query.size);
    const product = await Product.find({ size: req.query.size});
    if (product) {
      successResponse({
        res,
        message: "Related Product fetched successfully",
        data: product,
      });
    } else {
      errorResponse({ res, message: "Related Product not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

module.exports = { create, remove, edit, getSingle, getAll ,getRelatedProduct};
