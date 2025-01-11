import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.jsx";
import {useAdmin} from "@/context/AdminContext.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";
import {courseCurriculumInitialFormData} from "@/data/initialFormData.js";
import {useToast} from "@/hooks/use-toast.js";
import {LinearProgress} from "@mui/material";
import MediaProgressBar from "@/components/MediaProgressBar.jsx";
import VideoPlayer from "@/components/VideoPlayer.jsx";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";
import {Upload} from "lucide-react";
import {useRef} from "react";


// import {useAuth} from "@/context/AuthContext.jsx";

function CourseCurriculum() {
    const {toast} = useToast();
    const {
        courseCurriculum,
        setCourseCurriculum,
        mediaUploadProgress,
        setMediaUploadProgress,
        handleVideoUploadBackend,
        setMediaUploadPercent,
        mediaUploadingPercent,
        handleDeleteCurrentMedia,
        loading,
        handleBulkVideoUploadBackend
    } = useAdmin();
    // const { user } = useAuth();
    console.log(courseCurriculum);
    const bulkUploadRef = useRef(null);

    const handleAddLectureButton = () => {
        setCourseCurriculum([
            ...courseCurriculum,
            {
                ...courseCurriculumInitialFormData[0]
            }
        ])
    }
    //function to handle course title change
    function handleCourseTitleChange(e, currIndex) {
        let copyCourseCurriculum = [...courseCurriculum];
        copyCourseCurriculum[currIndex] = {
            ...copyCourseCurriculum[currIndex],
            title: e.target.value
        }
        setCourseCurriculum(copyCourseCurriculum);
    }

    //function to handle free preview change
    function handleFreePreviewChange(currValue, currIndex) {
        let copyCourseCurriculum = [...courseCurriculum];
        copyCourseCurriculum[currIndex] = {
            ...copyCourseCurriculum[currIndex],
            freePreview: currValue
        }
        setCourseCurriculum(copyCourseCurriculum);
    }

    //function to handle image upload on cloudinary while getting the url from the backend
    async function handleVideoUpload(e, currIndex) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            try {
                const data = await handleVideoUploadBackend(formData ,setMediaUploadPercent);
                console.log(data, "console from course curriculum");
                if (data?.success) {
                    let copyCourseCurriculum = [...courseCurriculum];
                    copyCourseCurriculum[currIndex] = {
                        ...copyCourseCurriculum[currIndex],
                        videoURL: data?.data?.secure_url,
                        public_id: data?.data?.public_id?.replace("mern-lms/", "")
                    }
                    setCourseCurriculum(copyCourseCurriculum);
                } else {
                    toast({
                        title: "Something went wrong",
                        variant: "destructive"
                    });
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            toast({
                title: "No File Selected",
                variant: "destructive"
            })
        }
    }

    //function to handle course curriculum form data
    function handleCourseCurriculumFormDataValid(){
        return courseCurriculum?.every(item=>{
            return item && typeof item === "object" && item?.title.trim() !== "" && item?.videoURL.trim() !== "";
        });
    }

    //function to handle replace assets from cloudinary
    async function handleReplaceVideo(currIndex) {
        let copyCourseCurriculum = [...courseCurriculum];
        const getCurrentVideoPublicID = copyCourseCurriculum[currIndex]?.public_id;
        // console.log(getCurrentVideoPublicID);
        const getDataFromContext = await handleDeleteCurrentMedia(getCurrentVideoPublicID);
        console.log("data from context" , getDataFromContext);
        if(getDataFromContext?.success){
            copyCourseCurriculum[currIndex]={
                ...copyCourseCurriculum[currIndex],
                videoURL : "",
                public_id: ""
            }
            setCourseCurriculum(copyCourseCurriculum);
        }else{
            toast({
                title: "Something went wrong",
                variant : "destructive"
            })
        }
    }

    //function to check fields are empty are not
    function isCourseCurriculumFormDataEmpty(arr){
        return arr.every((obj)=>{
            return Object.entries(obj).every(([key , value])=>{
                if(typeof value === "boolean"){
                    return true;
                }
                return value === ""
            })
        })
    }

    async function handleBulkUploadChange(e){
        try{
            const selectedFiles = Array?.from(e.target.files);
            console.log(selectedFiles);
            const bulkFormData = new FormData();
            if(selectedFiles?.length > 0){
                selectedFiles?.forEach(item=> bulkFormData?.append("files", item));
            }
            const data = await handleBulkVideoUploadBackend(bulkFormData,setMediaUploadPercent);
            if(data?.success){
                let copyCourseCurriculum = isCourseCurriculumFormDataEmpty(courseCurriculum) ? [] : [...courseCurriculum];
                copyCourseCurriculum = [
                    ...copyCourseCurriculum,
                    ...data?.data?.map((item,index)=>({
                        videoURL: item?.secure_url,
                        public_id: item?.public_id,
                        title : `Lecture ${copyCourseCurriculum?.length + (index + 1)}`,
                        freePreview: false
                    }))
                ];
                setCourseCurriculum(copyCourseCurriculum);
            }
            console.log(data , "BULK");
        }catch (e){
            console.log(e);
        }
    }

    async function handleDeleteLecture(currIndex){
        let copyCourseCurriculum = [...courseCurriculum];
        const getCurrentVideoPublicID = copyCourseCurriculum[currIndex]?.public_id;
        const getDataFromContext = await handleDeleteCurrentMedia(getCurrentVideoPublicID);
        console.log("data from context" , getDataFromContext);
        if(getDataFromContext?.success){
            copyCourseCurriculum = copyCourseCurriculum?.filter((_,index) => index !== currIndex);
            setCourseCurriculum(copyCourseCurriculum);
        }
    }



    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Create Course Curriculum</CardTitle>
                <div>
                    <Input
                        type="file"
                        accept="video/*"
                        multiple
                        className="hidden"
                        id="bulk-upload"
                        ref={bulkUploadRef}
                        onChange={handleBulkUploadChange}
                    />
                    <Button
                        onClick={()=> bulkUploadRef?.current?.click()}
                    >
                        <Upload/> Bulk Upload
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Button disabled={!handleCourseCurriculumFormDataValid() || mediaUploadProgress || loading} onClick={handleAddLectureButton}>
                    <PlusCircleIcon/> Add Lecture
                </Button>
                <div className="mt-6 space-y-4">
                    {courseCurriculum?.map((curr, index) => (
                        <div key={index} className="border p-6 rounded-md">
                            <div className="flex items-center gap-6">
                                <h3 className="font-semibold">Lecture {index + 1}</h3>
                                <Input
                                    type="text"
                                    placeholder="Enter Video Title"
                                    name={`title-${index + 1}`}
                                    className="max-w-96"
                                    onChange={(e) => handleCourseTitleChange(e, index)}
                                    value={courseCurriculum[index]?.title}
                                />
                                <div className="flex items-center gap-2">
                                    <Switch
                                        onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                                        checked={courseCurriculum[index]?.freePreview}
                                        id="freePreview"
                                    />
                                    <Label>
                                        Free Preview
                                    </Label>
                                </div>
                            </div>
                            <div className="mt-4">
                                {
                                    courseCurriculum[index]?.videoURL ? (
                                        <div className="flex gap-4 items-center">
                                            <VideoPlayer url={courseCurriculum[index]?.videoURL} />
                                            <Button size="sm" disabled={loading} onClick={()=> handleReplaceVideo(index)} >
                                                {loading ? <SpinnerLoader loadingText={"wait Deleting"}/> : "Replace Video"}
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={()=> handleDeleteLecture(index)}>
                                                {loading ? <SpinnerLoader loadingText={"wait Deleting"}/> : "Delete Video"}
                                            </Button>
                                        </div>
                                    ):(
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleVideoUpload(e, index)}
                                        />
                                    )
                                }

                            </div>
                            {mediaUploadProgress && !courseCurriculum[index].videoURL ? (
                                <MediaProgressBar
                                    isMediaUploading={mediaUploadProgress}
                                    progress={mediaUploadingPercent}
                                />
                            ): null}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseCurriculum;