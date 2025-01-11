import {errorHandler} from "../../helper/errorHandler.js";
import Course from "../../model/courseModal.js";
import Order from "../../model/OrderModal.js";
import StudentCourse from "../../model/studentCourseModal.js";

export const getCoursesList = async (req,res,next)=>{
    try{
        const { category =[] , level=[] , primaryLanguage=[] , sortBy="price-lowtohigh"} = req.query;
        let filters ={};
        if(category.length > 0){
            filters.category = { $in : category.split(",")};
        }if(level.length > 0){
            filters.level = { $in : level.split(",")};
        }if(primaryLanguage.length > 0){
            filters.primaryLanguage = { $in : primaryLanguage.split(",")};
        }
        let sort={};
        switch (sortBy) {
            case "price-lowtohigh":
                sort.pricing =1
                break;
            case "price-hightolow":
                sort.pricing = -1
                break;
            case "title-atoz":
                sort.courseTitle=1
                break;
            case "title-ztoa":
                sort.courseTitle=-1
                break;
            default :
                sort.pricing =1;
                break;
        }
        const studentCourseList = await Course.find(filters).sort(sort);

        res.json({
            success:true,
            courseList : studentCourseList,
        })
    }catch (e) {
        console.log(e);
        next(errorHandler(500, "Error Getting Courses"));
    }
}

export const getSingleCourse = async (req,res,next)=>{
    try{
        const { id } = req.params;
        if(!id){
            return next(errorHandler(400, "No Course ID Found"));
        }
        const getSingleCourseDetails = await Course.findById(id);
        res.json({
            success:true,
            courseList : getSingleCourseDetails
        })

    }catch (e) {
        console.log(e);
        next(errorHandler(500, "Error Getting Single Courses"));
    }
}

export const studentPersonalCourse = async (req,res,next)=>{
    try{
        const { userId } = req.params;
        const getUserPurchasedCourseDetails = await Order.find({ userId : userId});
        if(!getUserPurchasedCourseDetails){
            return next(errorHandler(404 , "No Purchased courses Found"));
        }
        res.status(200).json({
            success : true,
            course : getUserPurchasedCourseDetails
        });
    }catch (e) {
        console.log(e);
        next(errorHandler(500, "Error Getting Single Courses"));
    }
}