import express from "express";
import {authCheckUser} from "../../middleware/authCheckMiddleWare.js";
import {bulkUpLoadMedia, deleteMedia, uploadMediaFile} from "../../controller/admin/mediaController.js";
import multer from "multer";

const upload = multer({ dest : "uploads/"});

const router = express.Router();
router.route("/upload/:id").post(authCheckUser, upload.single("file"), uploadMediaFile);
router.route("/bulk-upload/:id").post(authCheckUser , upload.array("files" , 10) , bulkUpLoadMedia);
router.route("/delete/:id/:userID").delete(authCheckUser,deleteMedia);

export default router;