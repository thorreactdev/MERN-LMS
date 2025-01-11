import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import CourseCurriculum from "@/admin/components/CourseCurriculum.jsx";
import CourseLanding from "@/admin/components/CourseLanding.jsx";
import CourseSettings from "@/admin/components/CourseSettings.jsx";
import {useAdmin} from "@/context/AdminContext.jsx";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";
import {useAuth} from "@/context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {courseCurriculumInitialFormData, courseLandingInitialFormData} from "@/data/initialFormData.js";
import {useEffect} from "react";
import Loader from "@/utils/Loader.jsx";

function AdminCourseCreationPage() {
    const { courseFormData , courseCurriculum , handleCourseCreation , loading , setCourseFormData , setCourseCurriculum , handleCourseUpdate } = useAdmin();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { courseID } = useParams();


    //check the empty fields for array , object , string
    function isEmpty(value){
        if(Array.isArray(value)){
            return value.length === 0;
        }
        return value === null || value === undefined || value === "";
    }
    //check the form data is valid or not if not submit button is disabled
    function isFormDataValid(){
        for(const key in courseFormData){
            console.log(courseFormData , "from course creation page")
            if(key === "discount" && isEmpty(courseFormData[key])){
                continue;
            }
            if(isEmpty(courseFormData[key])){
                return false;
            }
        }
        let hasFreeView = false;
        for (const val of courseCurriculum){
            if(isEmpty(val?.title) || isEmpty(val?.videoURL) || isEmpty(val?.public_id) ){
                return false;
            }
            if(val?.freePreview){
                hasFreeView = true;
            }
        }
        return hasFreeView;
    }

    //function to upload course
    async function handleCourseUpload(){
        try{
            const courseFinalFormData ={
                adminID : user && user?._id,
                instructorName : user && user?.username,
                ...courseFormData,
                students : [],
                curriculum : courseCurriculum,
                isPublished : true
            }
            if(courseID){
                const { students , ...courseFinalUpdateData} = courseFinalFormData;
                await handleCourseUpdate(courseFinalUpdateData, courseID);
            }else{
                await handleCourseCreation(courseFinalFormData);
            }
            setCourseCurriculum(courseCurriculumInitialFormData);
            setCourseFormData(courseLandingInitialFormData);
            navigate(-1);
        }catch (e){
            console.log(e);
        }
    }

    //handle course edit get data from backend
    async function handleCourseEditData(){
        try{
            const res = await fetch(`/api/get-course-details/${courseID}`);
            const data = await res.json();
            console.log(data);
            if(data?.success){
                const setValuesInFormData = Object.keys(courseLandingInitialFormData).reduce((acc,key)=>{
                    acc[key] = data?.courseData[key];
                    return acc;
                },{});
                setCourseFormData(setValuesInFormData);
                setCourseCurriculum(data?.courseData?.curriculum);
            }else{
                alert("Fetch unsuccessful");
            }
        }catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(courseID){
            handleCourseEditData();
        }
    },[]);




    return (
        <>
            {
                loading ? (
                    <Loader loadingText={"Loading..."}/>
                ): (
                    <div className="w-full md:max-w-7xl mx-auto p-3 mt-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl md:text-3xl font-extrabold">
                                Create a new course
                            </h1>
                            <Button disabled={!isFormDataValid() || loading} size="lg"
                                    className="uppercase text-sm tracking-wider" onClick={handleCourseUpload}>
                                {loading ? <SpinnerLoader loadingText={courseID ? "Updating" : "Uploading"}/> : courseID ? "Update Data" : "Submit Data"}
                            </Button>
                        </div>
                        <Card className="mt-5">
                            <CardContent>
                                <div className="p-3">
                                    <Tabs defaultValue="curriculum" className="space-y-7">
                                        <TabsList>
                                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                            <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                                            <TabsTrigger value="course-setting">Settings</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value={"curriculum"}>
                                            <CourseCurriculum/>
                                        </TabsContent>
                                        <TabsContent value={"course-landing-page"}>
                                            <CourseLanding/>
                                        </TabsContent>
                                        <TabsContent value={"course-setting"}>
                                            <CourseSettings/>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </>

    );
}

export default AdminCourseCreationPage;