import {errorHandler} from "../../helper/errorHandler.js";
import StudentCourse from "../../model/studentCourseModal.js";
import Progress from "../../model/courseProgressModal.js";
import Course from "../../model/courseModal.js";

export const getCurrentCourseProgress = async (req,res,next)=>{
    try{
        const { userId , courseId } = req.params;
        const studentPurchasedCourse = await StudentCourse.findOne({ userId });
        const isStudentPurchasedCourseOrNot = studentPurchasedCourse?.courses?.findIndex((item)=> item?.courseId === courseId) > -1;
        if(!isStudentPurchasedCourseOrNot){
            return res.status(200).json({
                success : true,
                data : {
                    isPurchased : false
                },
                message : "You Need To Buy The Course To Access It"
            })
        }

        const currentCourseProgressPage = await Progress.findOne({
            userId,courseId
        })
        if(!currentCourseProgressPage || currentCourseProgressPage?.lecturesProgress?.length === 0){
            const course = await Course?.findById(courseId);
            if(!course){
                return next(errorHandler(404 , "Course Not Found"));
            }
            return res.status(200).json({
                success : true,
                message : "No Progress Found, You can start watching the course",
                data : {
                    courseDetails : course,
                    progress : [],
                    isPurchased : true,
                }
            })
        }
        const courseDetails = await Course.findById(courseId);

        res.status(200).json({
            success : true,
            data : {
                courseDetails,
                progress : currentCourseProgressPage?.lecturesProgress,
                completed : currentCourseProgressPage?.completed,
                completionDate: currentCourseProgressPage.completionDate,
                isPurchased: true,
            }
        });
    }catch (e){
        return next(errorHandler(500 , "Internal Server Error"));
    }

}

export const markCurrentLectureAsViewed = async (req,res,next)=>{
    try{
        const { userId , courseId , lectureId} = req.body;
        let progress = await Progress?.findOne({ userId , courseId});
        if(!progress){
            progress = new Progress({
                userId ,
                courseId,
                lecturesProgress :[{
                    lectureId,
                    viewed : true,
                    dateViewed: new Date()

                }]
            });
            await progress.save();
        }else{
            let lectureProgress = progress?.lecturesProgress?.find((item)=> item?.lectureId === lectureId);
            console.log(lectureProgress);
            if(lectureProgress){
                lectureProgress.viewed = true;
                lectureProgress.dateViewed = new Date();
            }else{
                progress?.lecturesProgress?.push({
                    lectureId,
                    viewed : true,
                    dateViewed : new Date()
                })
            }
            await progress.save();
        }

        const course = await Course.findById(courseId);
        if(!course){
            return next(errorHandler(404 , "Course Not Found"));
        }

        const markAllLectureAsCompleted = progress?.lecturesProgress?.length === course?.curriculum?.length && progress?.lecturesProgress?.every(item=> item?.viewed);
        if(markAllLectureAsCompleted){
            progress.completed = true;
            progress.completionDate = new Date();
            await progress.save();
        }
        res.status(200).json({
            success : true,
            data : progress,
            message : "Lecture Marked as Viewed"
        })
    }catch (e) {
        return next(errorHandler(500 , "Internal Server Error"));
    }
}

export const resetCurrentCourseProgress = async (req,res,next)=>{
    try{
        const { userId , courseId } = req.body;
        const progress = await Progress.findOne({ userId , courseId});
        if(!progress){
            return next(errorHandler(404, "Progress Not Found"));
        }

        progress.lecturesProgress =[];
        progress.completionDate = null;
        progress.completed = false;

        await progress.save();

        res.status(200).json({
            success : true,
            message : "Course Reset Successfully",
            data : progress
        })
    }catch (e) {
        return next(errorHandler(500 , "Internal Server Error"));
    }
}

