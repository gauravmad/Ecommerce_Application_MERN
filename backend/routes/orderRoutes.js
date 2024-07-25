express =require("express");
const { placeOrder,find,getAll,edit } = require("../controllers/orderController");
const {protect,adminProtect} =require("../middlewares/authMiddleware");

router =express.Router();

router.route("/place-order").post(protect,placeOrder );
router.route("/get-order-details/:id").get(protect,find);
router.route("/get-all-orders").get(adminProtect,getAll);
router.route("/edit-order/:id").post(protect,edit);
module.exports=router;