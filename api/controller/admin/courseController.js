import {errorHandler} from "../../helper/errorHandler.js";
import Course from "../../model/courseModal.js";
import StudentCourse from "../../model/studentCourseModal.js";


export const addNewCourse = async (req, res , next) => {
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You Cannot Upload The Course ID Not Matched"));
        }
        const courseData = req.body;
        const DISCOUNT_PRICE = (courseData?.discount ?? 10) / 100;
        console.log(DISCOUNT_PRICE);
        const disCountedPrice = courseData.pricing - (courseData.pricing * DISCOUNT_PRICE);
        courseData.disCountedPrice = disCountedPrice.toFixed(3); // Add discounted price to the course data
        const savedCourse = new Course(courseData);
        await savedCourse.save();
        res.status(200).json({
            message : "Course Added Successfully",
            success : true,
            courseData : savedCourse
        });
    }catch(e){
        console.log(e)
        return next(errorHandler(500 , "Failed To Add New Course"));
    }
};

export const updateCourse = async (req, res, next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You Cannot Update The Course ID Not Matched"));
        }
        const { courseID } = req.params;
        if(!courseID){
            return next(errorHandler(403 , "Sorry Cannot Update Course Because courseID Not found"));
        }
        const updatedCourseData = req.body;
        console.log(updatedCourseData?.discount);
        const DISCOUNT_PRICE = (updatedCourseData?.discount ?? 10) / 100;
        console.log(DISCOUNT_PRICE);
        const updatedDisCountedPrice = updatedCourseData?.pricing - (updatedCourseData?.pricing * DISCOUNT_PRICE);
        updatedCourseData.disCountedPrice = updatedDisCountedPrice?.toFixed(3);
        const updatedCourse = await Course.findByIdAndUpdate(courseID ,updatedCourseData, { new : true});
        if(!updatedCourse){
            return res.status(404).json({
                success : false,
                message : "Course data not found",
            })
        }
        res.status(200).json({
            success : true,
            message : "Course Data Updated",
            courseData : updatedCourse
        })
    }catch (e){
        console.log(e);
        return next(errorHandler(500 , "Failed To Update the course"));
    }
}

export const getCoursesBasedOnId = async (req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You Cannot Get The Course data ID Not Matched"));
        }
        const getCourseDataList = await Course.find({ adminID: req.params.id});
        if(!getCourseDataList){
            return res.status(404).json({
                success : false,
                message : "Course Not Found",
            })
        }
        res.status(200).json({
            success: true,
            message : "Fetched The Course Based on ID",
            courseData : getCourseDataList
        });
    }catch (e) {
        console.log(e);
        return next(errorHandler(500 , "Failed To Get the course Data"));
    }
}

export const getCourseDetails = async (req, res, next)=>{
    try{
       const { id } = req.params;
       console.log(id);
       const getCourseDetailsData = await Course.findById(id);
       if(!getCourseDetailsData){
           return res.status(404).json({
               success : false,
               message : "Course Not Found",
           })
       }

       res.status(200).json({
           success : true , message : "Course Found" ,
           courseData : getCourseDetailsData ,
       })
    }catch (e){
        console.log(e);
        return next(errorHandler(500 , "Failed To Get the Single course Data"));
    }
}

export const getAllCourses = async (req,res,next)=>{
    try{
        const getAllCoursesData = await Course.find();
        if(!getAllCoursesData){
            return next(errorHandler(404, "No Course Found"));
        }
        res.status(200).json({
            success: true,
            message : "All The Courses Found",
            courseData : getAllCoursesData
        })
    }catch (e){
        console.log(e);
        return next(errorHandler(500, "Failed To Get All Courses Data"));
    }
}

export const deleteCourseBasedOnID = async (req, res , next)=>{
    try{
        if(req.user.role !== "admin" || req.user.id !== req.params.id){
            return next(errorHandler(401 , "Unauthorized Not Allowed To Delete The Course"));
        }
        const { courseID } = req.params;
        if(!courseID){
            return next(400, "No CourseID Found");
        }
        await Course.findByIdAndDelete(courseID);
        res.status(200).json({ success : true , message : `Course Deleted Successfully with ID ${courseID}`});
    }catch (e){
        console.log(e);
    }
}

export const checkCoursePurchased = async (req,res,next)=>{
    try{
        const { id , studentId } = req.params;
        console.log(id , studentId);
        const studentCourse = await StudentCourse?.findOne({
            userId : studentId
        });
        console.log(studentCourse);
        const isStudentPurchasedCourse = studentCourse?.courses?.findIndex((item)=> item?.courseId === id) > -1 ;
        console.log(isStudentPurchasedCourse);
        res.status(200).json({
            success : true , purchasedOrNot : isStudentPurchasedCourse
        })
    }catch (e) {
        console.log(e);
        return next(errorHandler(500, "Something went wrong"));
    }
}