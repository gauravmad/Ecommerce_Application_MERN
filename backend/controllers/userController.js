const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");
const Orders = require("../models/orderModel");

const register = asyncHandler(async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      mobile_number,
      email,
      city,
      country,
      address,
      state,
      pincode,
      profile_image,
      password,
    } = req.body;
    if (
      !first_name ||
      !password ||
      !mobile_number ||
      !email ||
      !last_name ||
      !city ||
      !country ||
      !address ||
      !state ||
      !pincode
    ) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const emailExists = await Users.findOne({ email });
    const mobileExists = await Users.findOne({ mobile_number });

    if (emailExists) {
      errorResponse({ res, message: "Email already exists!" });
    }
    if (mobileExists) {
      errorResponse({ res, message: "Mobile number already exists!" });
    }
    const user = await Users.create({
      first_name,
      last_name,
      mobile_number,
      email,
      city,
      country,
      address,
      state,
      pincode,
      profile_image,
      password,
    });
    if (user) {
      const data = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        mobile_number: user.mobile_number,
        email: user.email,
        city: user.city,
        country: user.country,
        address: user.address,
        state: user.state,
        pincode: user.pincode,
        profile_image: user.profile_image,
        password: user.password,
        token: generateToken(user._id),
      };
      successResponse({
        res,
        message: "user created successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const user = await Users.findOne({ email });

    if (!user) {
      errorResponse({ res, message: "user does not exists!" });
    }
    if (user && (await user.matchPassword(password))) {
      const data = {
        _id: user._id,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      };
      successResponse({
        res,
        message: "user login successfully",
        data: data,
      });
    }
    else{
      errorResponse({ res, message: "Password not Match!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getSingle = asyncHandler(async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      successResponse({
        res,
        message: "User fetched successfully",
        data: user,
      });
    } else {
      errorResponse({ res, message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const edit = asyncHandler(async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      mobile_number,
      email,
      city,
      country,
      address,
      state,
      pincode,
      profile_image,
    } = req.body;
    if (
      !first_name ||
      !mobile_number ||
      !email ||
      !last_name ||
      !city ||
      !country ||
      !address ||
      !state ||
      !pincode
    ) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const member = await Users.findByIdAndUpdate(
      req.params.id,
      {
        first_name: first_name,
        last_name: last_name,
        mobile_number: mobile_number,
        email: email,
        city: city,
        country: country,
        address: address,
        state: state,
        pincode: pincode,
        profile_image: profile_image,
      },
      {
        new: true,
      }
    );
    if (member) {
      successResponse({
        res,
        message: "User Details Update Successfullt",
        data: member,
      });
    } else {
      errorResponse({ res, message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!"});
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find();
    if (users) {
      successResponse({
        res,
        message: "Users fetched successfully",
        data: users,
      });
    } else {
      errorResponse({ res, message: "No Users data!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ user_id: req.params.user_id });
    console.log(orders);
    if (orders) {
      successResponse({
        res,
        message: "Order fetched successfully",
        data: orders,
      });
    } else {
      errorResponse({ res, message: "Orders not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});
module.exports = { login, register, getSingle, edit,getAll,getAllOrders };
