import {createContext, useContext, useState} from "react";
import {useToast} from "@/hooks/use-toast.js";
import {useNavigate} from "react-router-dom";

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[buyNowLoading, setBuyNowLoading] = useState(false);
    const[studentCourseList ,setStudentCourseList] = useState([]);
    const[singleCourseData , setSingleCourseData] = useState(null);
    const[studentCourseProgress , setStudentCourseProgress] = useState({});
    // const[getSingleCourseList , setGetSingleCourseList] = useState(null);

    //function to handle student Courses List
    async function getStudentCourseList(filters, sort){
        try{
            setLoading(true);
            const query = new URLSearchParams({
                ...filters,
                sortBy : sort
            })
            const res = await fetch(`/api/student-course-list?${query}`);
            const data = await res.json();
            if(data?.success){
                setStudentCourseList(data?.courseList);
            }else{
                toast({
                    title : data?.message,
                    variant: "destructive"
                });
                setLoading(false);

            }
        }catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    // function to handle single course details page
    async function getSingleCourseList(courseID){
        try{
            setLoading(true);
            const res = await fetch(`/api/get-course-details/${courseID}`);
            const data = await res.json();
            console.log(data);
            if(data?.success){
                setSingleCourseData(data?.courseData);
            }else{
                toast({
                    title : data?.message,
                    variant: "destructive"
                })
            }
        }catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    // function to handle payment data
    async function handleMakePayment(formData){
        try{
            setBuyNowLoading(true);
            const res = await fetch(`/api/create-order`,{
                method : "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            if(data?.success){
                setBuyNowLoading(false);
                return data;
            }else{
                toast({
                    title : data?.message,
                    variant : "destructive"
                })
                setBuyNowLoading(false);
            }
        }catch (e) {
            console.log(e);
        }finally {
            setBuyNowLoading(false);
        }

    }

    // function to handle check course purchased or not
    async function checkCoursePurchased(courseId , studentId){
        try{
            const res = await fetch(`/api/check-course-purchase/${courseId}/${studentId}`);
            const data = await res.json();
            console.log(data);
            if(data?.success){
                if(data?.purchasedOrNot){
                    navigate(`/course-progress-page/${courseId}`);
                }else{
                    navigate(`/course/details/${courseId}`);
                }
            }else {
                toast({
                    title : "Something went wrong",
                    variant : "destructive"
                })
            }
        }catch (e){
            console.log(e);
        }
    }

    // function to handle check course progress
    async function checkCurrentCourseProgress(userId , courseId){
        try{
            const res = await fetch(`/api/course-progress/${userId}/${courseId}`);
            const data = await res.json();
            return data;
        }catch (e) {
            console.log(e);
        }
    }

    async function markLectureAsViewed(formData){
        try{
            const res = await fetch(`/api/course-mark-lecture`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            return data;
        }catch (e) {
            console.log(e);
        }
    }

    async function resetCourse(formData){
        try{
            const res = await fetch(`/api/course-reset`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            return data;
        }catch (e) {
            console.log(e);
        }
    }


    return (
        <StudentContext.Provider value={{
            getStudentCourseList,
            studentCourseList,
            loading,
            getSingleCourseList,
            singleCourseData , setSingleCourseData,
            handleMakePayment,
            buyNowLoading, setBuyNowLoading,
            checkCoursePurchased,
            studentCourseProgress , checkCurrentCourseProgress,
            setStudentCourseProgress, markLectureAsViewed , resetCourse
        }}>
            {children}
        </StudentContext.Provider>);
}

export const useStudent = () => useContext(StudentContext);