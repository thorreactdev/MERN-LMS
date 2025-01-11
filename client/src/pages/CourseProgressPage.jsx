import {Button} from "@/components/ui/button.jsx";
import {Check, ChevronLeft, ChevronRight, Play} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {useStudent} from "@/context/StudentContext.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import Confetti from 'react-confetti'
import VideoPlayer from "@/components/VideoPlayer.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";

function CourseProgressPage() {
    const navigate = useNavigate();
    const { studentCourseProgress , checkCurrentCourseProgress ,setStudentCourseProgress , markLectureAsViewed , resetCourse } = useStudent();
    const { id } = useParams();
    const { user } = useAuth();

    const[lockCourse , setLockCourse] = useState(false);
    const[currentLecture , setCurrentLecture] = useState(null);
    const[completedDialog , setCompletedDialog] = useState(false);
    const[showConfetti , setShowConfetti] = useState(false);
    const[isSideBarOpen , setIsSideBarOpen] = useState(true);

    async function getCurrentCourseProgress(){
        try{
            const courseProgressData = await checkCurrentCourseProgress(user?._id , id);
            console.log(courseProgressData);
            if(courseProgressData?.success){
                if(!courseProgressData?.data?.isPurchased){
                    setLockCourse(true);
                }else{
                    setStudentCourseProgress({
                        courseDetails : courseProgressData?.data?.courseDetails,
                        progress : courseProgressData?.data?.progress
                    });

                    if(courseProgressData?.data?.completed){
                        setCurrentLecture(courseProgressData?.data?.courseDetails?.curriculum[0]);
                        setCompletedDialog(true);
                        setShowConfetti(true);
                        return;
                    }
                    if(courseProgressData?.data?.progress?.length === 0){
                        setCurrentLecture(courseProgressData?.data?.courseDetails?.curriculum[0]);
                    }else{
                        console.log("logging here...");
                        const lastIndex = courseProgressData?.data?.progress?.reduceRight((acc, obj , index)=>{
                            return acc === -1 && obj?.viewed ? index : acc
                        },-1)

                        console.log(lastIndex);

                        setCurrentLecture(courseProgressData?.data?.courseDetails?.curriculum[lastIndex + 1]);
                    }
                }
            }
        }catch (e) {
            console.log(e);
        }
    }

    async function getMarkCurrentCourseLecture(){
        try{
            const formData = {
                userId : user?._id ,
                courseId : studentCourseProgress?.courseDetails?._id,
                lectureId : currentLecture?._id
            }
            const getData = await markLectureAsViewed(formData);
            console.log(getData, "gerData");
            if(getData?.success){
                await getCurrentCourseProgress();
            }
        }catch (e) {
            console.log(e);
        }
    }

    async function resetCourseData(){
        try{
            const formData = {
                userId : user?._id ,
                courseId :  studentCourseProgress?.courseDetails?._id,
            }
            const getResetData = await resetCourse(formData);
            if(getResetData?.success){
                setCurrentLecture(null);
                setShowConfetti(false);
                setCompletedDialog(false);
                await getCurrentCourseProgress();
            }

        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCurrentCourseProgress();
    }, [id]);

    useEffect(() => {
        if(currentLecture?.progressValue === 1){
            getMarkCurrentCourseLecture();
        }
    }, [currentLecture]);

    console.log(currentLecture);

    return(
        <div className="flex flex-col h-screen bg-black text-white">
            {showConfetti && <Confetti/>}
            <div className="flex items-center justify-between p-4 bg-black border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <Button onClick={()=> navigate("/my_courses")} variant="secondary" className="text-black">
                        <ChevronLeft className="h-4 w-4 "/>
                        Back To CoursePage
                    </Button>
                    <h1 className="font-bold text-lg">
                        {studentCourseProgress?.courseDetails?.courseTitle}
                    </h1>
                </div>
                <Button onClick={()=> setIsSideBarOpen(!isSideBarOpen)}>
                    {isSideBarOpen ? <ChevronRight/> : <ChevronLeft/>}
                </Button>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className={`flex-1 ${isSideBarOpen ? "mr-[400px]" : ""} mt-3`}>
                    <VideoPlayer
                        width="100%"
                        height="650px"
                        url={currentLecture?.videoURL}
                        onProgressData={setCurrentLecture}
                        progressData={currentLecture}
                    />
                    <div className="p-4 font-medium text-xl">
                        <h2>
                            {currentLecture?.title}🚀🚀
                        </h2>
                    </div>
                </div>
                <div className={`fixed top-[64px] w-[400px]  right-0 bottom-0 bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${isSideBarOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <Tabs defaultValue="content" className="h-full flex flex-col">
                        <TabsList className="grid  grid-cols-2 w-full rounded-none h-14 p-0">
                            <TabsTrigger value="content" className="text-black rounded-none h-full">
                                Course content
                            </TabsTrigger>
                            <TabsTrigger value="overview" className="text-black rounded-none h-full">
                                Over View
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="content">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-4">
                                    {studentCourseProgress?.courseDetails?.curriculum?.map((item)=> (
                                        <div key={item?._id} className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer">
                                            {studentCourseProgress?.progress?.find(progressItem=> progressItem?.lectureId === item?._id)?.viewed ? <Check className="h-4 w-4 text-green-500"/> : <Play className={"h-4 w-4"}/>}
                                            <span>
                                                {item?.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="overview">
                            <ScrollArea className={"h-full"}>
                                <div className="p-4 flex flex-col gap-3">
                                    <h2 className="text-lg font-bold my-2">About This Course</h2>
                                    <p className="text-sm font-medium text-gray-200">
                                        {studentCourseProgress?.courseDetails?.description}
                                    </p>
                                    <h2 className="text-lg font-bold my-2">Welcome Message</h2>
                                    <p className="text-sm font-medium text-gray-200">
                                        {studentCourseProgress?.courseDetails?.welcomeMessage}
                                    </p>
                                    <div>
                                        <h2 className="text-lg font-bold my-2">What You'll learn</h2>
                                        {studentCourseProgress?.courseDetails?.objectives?.split(",")?.map((obj)=>(
                                            <span className="text-xs">
                                                {obj}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="my-5">
                                        <h1 className="text-lg font-bold">
                                            Basic Info
                                        </h1>
                                        <h2 className="text-sm font-bold my-2">Course Category : {studentCourseProgress?.courseDetails?.category}</h2>
                                        <h2 className="text-sm font-bold my-2">Course Level : {studentCourseProgress?.courseDetails?.level}</h2>
                                        <h2 className="text-sm font-bold my-2">Course Language : {studentCourseProgress?.courseDetails?.primaryLanguage}</h2>
                                        <h2 className="text-sm font-bold my-2">Course Instructor : {studentCourseProgress?.courseDetails?.instructorName}</h2>
                                        <h2 className="text-sm font-bold my-2">Course Created On : {studentCourseProgress?.courseDetails?.createdAt?.split("T")[0]}</h2>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Dialog open={lockCourse}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        You can't View This page
                    </DialogTitle>
                    <DialogDescription>
                        Please Purchase the course to access
                    </DialogDescription>
                </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog open={completedDialog}>
                <DialogContent showOverlay={true}>
                    <DialogHeader>
                        <DialogTitle>
                            Congratulations!🚀
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-3">
                            <Label>
                                You Have Completed The Course
                            </Label>
                            <div className="flex gap-3">
                                <Button onClick={()=> navigate("/my_courses")}>
                                    My Course
                                </Button>
                                <Button onClick={()=> resetCourseData()}>
                                    Re-watch Course
                                </Button>
                            </div>
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default CourseProgressPage;