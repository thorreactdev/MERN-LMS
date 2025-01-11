import express from "express";
import {authCheckUser} from "../../middleware/authCheckMiddleWare.js";
import {getCoursesList, getSingleCourse, studentPersonalCourse} from "../../controller/user/studentCourseController.js";

const router = express.Router();

router.route("/student-course-list").get(getCoursesList);
router.route("/student-single-course-details/:id").get(getSingleCourse);
router.route("/student-purchased-course/:userId").get(authCheckUser, studentPersonalCourse);

export default router;