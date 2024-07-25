const express = require("express");
const {protect,adminProtect} =require("../middlewares/authMiddleware");
const { create ,getSingle,getAll,edit,remove} = require("../controllers/reviewsController");

const router =express.Router();

router.route("/add-reviews").post(protect,create);
router.route("/get-review-details/:id").get(getSingle);
router.route("/get-all-review").get(getAll);
router.route("/edit-review/:id").post(protect,edit)
router.route("/remove-review/:id").delete(adminProtect, remove);

module.exports=router;