import express from 'express';
import {authCheckUser} from "../../middleware/authCheckMiddleWare.js";
import {
    getCurrentCourseProgress,
    markCurrentLectureAsViewed,
    resetCurrentCourseProgress
} from "../../controller/user/courseProgressController.js";
const router = express.Router();

router.route("/course-progress/:userId/:courseId").get(authCheckUser , getCurrentCourseProgress);
router.route("/course-mark-lecture").post(markCurrentLectureAsViewed);
router.route("/course-reset").post(resetCurrentCourseProgress);

export default router;