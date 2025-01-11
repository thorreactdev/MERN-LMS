import express from "express";
import {authCheckUser} from "../../middleware/authCheckMiddleWare.js";
import {
    capturePayment,
    createOrder, generateReceiptForPurchase,
    verifyCancelSession,
    verifyPaymentAndSaveData
} from "../../controller/user/OrderController.js";
const router = express.Router();

router.route("/create-order").post(authCheckUser, createOrder);
router.route("/capture-final-payment").post(authCheckUser, capturePayment);
router.route("/verify-payment").get(authCheckUser, verifyPaymentAndSaveData);
router.route("/verify-cancel-payment").post(authCheckUser , verifyCancelSession);
router.route("/generate-receipt/:userId/:courseId").post(authCheckUser , generateReceiptForPurchase);


export default router;