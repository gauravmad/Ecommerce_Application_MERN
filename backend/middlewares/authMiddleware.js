const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../helpers/apiResponse");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      errorResponse({ res, message: "Unauthorized" });
    }
  } else {
    errorResponse({ res, message: "Unauthorized" });
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select("-password");
      if (req.user.isAdmin){
        next()
      }else{
      errorResponse({ res, message: "You Are not Admin!" });
      }
    } catch (e) {
      errorResponse({ res, message: "Unauthorized" });
    }
  } else {
    errorResponse({ res, message: "Unauthorized" });
  }
});

module.exports = {protect,adminProtect};
