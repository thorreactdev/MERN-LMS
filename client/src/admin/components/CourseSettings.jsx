import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useAdmin} from "@/context/AdminContext.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {LinearProgress} from "@mui/material";


function CourseSettings() {
    const {toast} = useToast();
    const {courseFormData, setCourseFormData, handleVideoUploadBackend ,mediaUploadProgress} = useAdmin();

    async function handleImageChange(e) {
        const selectedFile = e.target.files[0];
        console.log("selectedFile", selectedFile);
        if(selectedFile?.type === "image/svg+xml"){
            toast({
                title : "File Type Not Supported",
                variant : "destructive"
            });
            return;
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            try {
                const data = await handleVideoUploadBackend(formData);
                if (data?.success) {
                    setCourseFormData((prevData) => ({
                            ...prevData,
                            image: data?.data?.secure_url,
                            public_id:data?.data?.public_id.replace("mern-lms/", "")
                        }
                    ))
                    toast({
                        title: data?.message,
                    })
                } else {
                    toast({
                        title: data?.message,
                        variant: "destructive",
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }else{
            alert("Something went wrong");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    courseFormData?.image ? (
                        <img src={courseFormData?.image} alt="Landing page"/>
                    ) : (
                        <>
                        <div className="flex flex-col gap-4 mt-2">
                            <Label>Upload The Course Thumbnail</Label>
                            <Input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                onChange={handleImageChange}
                            />
                        </div>
                            {mediaUploadProgress && (
                                <div className="mt-3">
                                    <LinearProgress/>
                                </div>
                            )}
                        </>

                    )
                }

            </CardContent>
        </Card>
    )
}

export default CourseSettings;