import CourseCard from "@/components/CourseCard.jsx";
import {useStudent} from "@/context/StudentContext.jsx";
import {useEffect} from "react";
import Loader from "@/utils/Loader.jsx";
import SkeletonCardLoader from "@/utils/SkeletonCardLoader.jsx";
import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext.jsx";

function CourseList() {
    const {  getStudentCourseList, studentCourseList, loading , checkCoursePurchased } = useStudent();
    const { user } = useAuth();

    async function handlePurchasedOrNot(getCourseId){
        await checkCoursePurchased(getCourseId, user?._id);
    }

    useEffect(()=>{
        getStudentCourseList();
    },[]);




    return(
        <div className="max-w-7xl mx-auto my-10">
            <h2 className="text-center text-[30px] text-slate-700 font-semibold mt-20 mb-5">Available Courses</h2>
            {
                loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 cursor-pointer">
                        <SkeletonCardLoader cardCount={studentCourseList?.length}/>
                    </div>
                ): (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 cursor-pointer">
                        {studentCourseList && studentCourseList.length > 0 ? (
                            studentCourseList?.map((course)=>(
                                <div key={course?._id} onClick={()=> handlePurchasedOrNot(course?._id)}>
                                <CourseCard
                                    title={course?.courseTitle}
                                    image={course?.image}
                                    author={course?.instructorName}
                                    pricing={course?.pricing}
                                    description={course?.subtitle}
                                    level={course?.level}
                                    disCountedPrice={course?.disCountedPrice}
                                />
                                </div>
                            ))
                        ):(
                            <p>No Course Found...</p>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CourseList;