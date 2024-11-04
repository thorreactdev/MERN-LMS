import express from 'express';
import {authLogin, authRegister, googleLogin} from "../controller/authController.js";
import {authCheckUser} from "../middleware/authCheckMiddleWare.js";
const router = express.Router();

router.route("/signup").post(authRegister);
router.route("/login").post(authLogin);
router.route("/auth/google").post(googleLogin);
router.route("/auth/protected").get(authCheckUser , (req,res )=>{
    res.status(200).json({
        success: true,
        message: "Authentication successful 🚀👍",
        user: req.user
    })
})
export default router;
