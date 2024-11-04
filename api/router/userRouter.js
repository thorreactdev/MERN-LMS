import express from 'express';
import {authCheckUser} from "../middleware/authCheckMiddleWare.js";
import {userSignout, userUpdate} from "../controller/userController.js";
const router = express.Router();

router.route("/user/signout/:id").post(userSignout);
router.route("/user/update/:id").patch(authCheckUser, userUpdate);

export default router;