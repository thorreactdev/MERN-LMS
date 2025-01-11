import express from "express";
import {authCheckUser} from "../../middleware/authCheckMiddleWare.js";
import {
    addNewCourse,
    updateCourse,
    getCoursesBasedOnId,
    getCourseDetails,
    getAllCourses,
    deleteCourseBasedOnID, checkCoursePurchased
} from "../../controller/admin/courseController.js";
import {getDataOFUploadedCourseByAdmin} from "../../controller/admin/adminCourseDataController.js";
const router = express.Router();

router.route("/create-course/:id").post(authCheckUser , addNewCourse);
router.route("/update-course/:id/:courseID").patch(authCheckUser, updateCourse);
router.route("/get-admin-course/:id").get(authCheckUser, getCoursesBasedOnId);
router.route("/get-course-details/:id/").get(getCourseDetails);
router.route("/get-all-courses").get(getAllCourses);
router.route("/delete-course/:id/:courseID").delete(authCheckUser, deleteCourseBasedOnID);
router.route("/check-course-purchase/:id/:studentId").get(checkCoursePurchased);
router.route("/get-course-data-numbers/:adminID").get(getDataOFUploadedCourseByAdmin);

export default router;