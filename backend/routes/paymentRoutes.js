express =require("express");
const { makePayment,find,getAll,edit,order,validatePayment } = require("../controllers/paymentController");
const {protect,adminProtect} =require("../middlewares/authMiddleware");


router =express.Router();

router.route("/make-payment").post(protect,makePayment );
router.route("/edit-payment/:id").post(adminProtect,edit);
router.route("/get-payment-details/:id").get(protect,find);
router.route("/get-all-payments").get(adminProtect,getAll);

//
router.route("/rezopay-order").post(order);
router.route("/rezopay-order/validate").post(validatePayment);

module.exports=router;