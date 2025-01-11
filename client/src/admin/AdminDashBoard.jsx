import {Card, CardContent, CardHeader, CardDescription, CardTitle} from "@/components/ui/card.jsx";
import { UsersIcon } from "@heroicons/react/24/outline";
import {useAuth} from "@/context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {BookOpen, DollarSign} from "lucide-react";

function AdminDashBoard() {
    const { user } = useAuth();
    const [totalCourseData , setTotalCourse] =useState(0);
    const [totalRevenueData , setTotalRevenue] = useState(0);
    const [totalStudentsData , setTotalStudents] = useState(0);

    async function getData(){
        try{
            const res = await fetch(`/api/get-course-data-numbers/${user?._id}`);
            const data = await res.json();
            if(data?.success){
                setTotalCourse(data?.result?.totalCourses);
                setTotalStudents(data?.result?.totalStudents);
                setTotalRevenue(data?.result?.totalRevenue);
            }else{
                alert("Something went wrong");
            }
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    console.log(totalCourseData, totalStudentsData,totalRevenueData);
    return (
        <>
        <div className="flex flex-col gap-3 cursor-pointer">
        <Card className="bg-gradient-to-r from-purple-700 to-purple-500 hover:shadow-blue-100">
            <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg lg:text-xl">
                    Total Students
                </CardTitle>
                <UsersIcon className="w-7 h-7 text-white"/>
                </div>
                <CardDescription className="text-white">
                    Number of Student Registered on Your All Courses
                </CardDescription>
            </CardHeader>
            <CardContent className="text-white font-bold">
                {totalStudentsData}
            </CardContent>
        </Card>
            <Card className="bg-gradient-to-r from-teal-700 to-teal-500">
            <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg lg:text-xl">
                    Total Courses
                </CardTitle>
                <BookOpen className="w-7 h-7 text-white"/>
                </div>
                <CardDescription className="text-white">
                    Number Of Courses Uploaded By You
                </CardDescription>
            </CardHeader>
            <CardContent className="text-white font-bold">
                {totalCourseData}
            </CardContent>
        </Card>
            <Card className="bg-gradient-to-r from-orange-700 to-orange-500">
            <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg lg:text-xl">
                    Total Revenue
                </CardTitle>
                <DollarSign  className="w-7 h-7 text-white"/>
                </div>
                <CardDescription className="text-white">
                    All Time Revenue Generated From Your Courses
                </CardDescription>
            </CardHeader>
            <CardContent className="text-white font-bold">
                {totalRevenueData}
            </CardContent>
        </Card>
        </div>
        </>
    )
}
export default AdminDashBoard;