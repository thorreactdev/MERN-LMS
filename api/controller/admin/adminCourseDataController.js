import Course from "../../model/courseModal.js";
import {errorHandler} from "../../helper/errorHandler.js";

export const getDataOFUploadedCourseByAdmin = async (req,res,next)=>{
    try{
        const { adminID  } = req.params;
        const courses = await Course?.find({ adminID });
        if(!courses){
            return next(errorHandler(404 , "No Courses Found for this adminID"));
        }
        console.log(courses);

        let totalStudents = 0;
        let totalRevenue = 0;

        courses?.forEach((course)=>{
            const enrolledStudents = course?.students?.length;
            totalStudents += enrolledStudents;

            course.students.forEach(student => {
                const amountPaid = parseFloat(student.paidAmount) || course.disCountedPrice;
                totalRevenue += amountPaid;
            });
        });

        const result = {
            totalCourses : courses.length,
            totalStudents,
            totalRevenue
        }

        console.log(result);

        res.status(200).json({
            success : true,
            result,
        })
    }catch (e) {
        return next(errorHandler(500 , "Internal Server Error"));
    }
}