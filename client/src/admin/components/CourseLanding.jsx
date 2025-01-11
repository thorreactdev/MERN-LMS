import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {courseCategories , courseLevelOptions , languageOptions} from "@/data/importantData.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {useState} from "react";
import {courseLandingInitialFormData} from "@/data/initialFormData.js";
import {useAdmin} from "@/context/AdminContext.jsx";
import PricingModal from "@/models/PricingModal.jsx";
import {useToast} from "@/hooks/use-toast.js";

function CourseLanding() {
    const { courseFormData , setCourseFormData  } = useAdmin();
    const { toast } = useToast()
    const[openModal , setOpenModal] = useState(false);
    function handleCourseLandingFormDataChange(id , value) {
        setCourseFormData((prevData)=>(
            {...prevData,
                [id] : value
            }
        ));
    }
    const handleConfirm = ()=>{
        if(courseFormData?.pricing === ""){
            return toast({
                title : "Pricing Cannot Be Empty",
                variant : "destructive"
            })
        }else{
            setOpenModal(false);
        }
    }

    console.log(courseFormData);
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Course Landing Page
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6 mt-4 md:px-0">
                        <div className="flex flex-col gap-3">
                            <Label>Course Title</Label>
                            <Input
                                type="text"
                                placeholder="Enter Course Title (Max Length : 60 chars)"
                                id="courseTitle"
                                maxLength={60}
                                onChange={(e)=> handleCourseLandingFormDataChange("courseTitle" , e.target.value)}
                                value={courseFormData?.courseTitle}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Course Category
                            </Label>
                            <Select id="category"  value={courseFormData?.category} onValueChange={(value)=> handleCourseLandingFormDataChange("category", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Course Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {courseCategories.map(category => (
                                        <SelectItem key={category?.id} value={category?.id}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Course Difficulty
                            </Label>
                            <Select value={courseFormData?.level} onValueChange={(value)=> handleCourseLandingFormDataChange("level" , value)} id='level'>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Course Difficulty"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {courseLevelOptions.map(level => (
                                        <SelectItem key={level?.id} value={level?.id}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Course Language
                            </Label>
                            <Select value={courseFormData?.primaryLanguage} onValueChange={(value)=> handleCourseLandingFormDataChange("primaryLanguage", value)} id='primaryLanguage'>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Course Language"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {languageOptions.map(lang => (
                                        <SelectItem key={lang?.id} value={lang?.id}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Course Subtitle</Label>
                            <Input
                                type="text"
                                placeholder="Enter Course Sub Title (Max Length : 200 chars)"
                                id="subtitle"
                                maxLength={200}
                                value={courseFormData?.subtitle}
                                onChange={(e)=> handleCourseLandingFormDataChange("subtitle", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Course Description</Label>
                            <Textarea
                                rows={5}
                                type="text"
                                placeholder="Enter Course Description (Max Length : 600 chars)"
                                id="description"
                                maxLength={1000}
                                value={courseFormData?.description}
                                className='resize-none'
                                onChange={(e)=> handleCourseLandingFormDataChange("description", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Course Pricing</Label>
                            <Input
                                type="text"
                                placeholder="Enter Course Pricing in dollar ($)"
                                onClick={()=> setOpenModal(true)}
                                value={courseFormData?.pricing}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Course Objective</Label>
                            <Textarea
                                rows={5}
                                type="text"
                                placeholder="Enter Course Objective (Max Length : 200 chars)"
                                id="objectives"
                                // maxLength={200}
                                className='resize-none'
                                value={courseFormData?.objectives}
                                onChange={(e)=> handleCourseLandingFormDataChange("objectives", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Welcome Message</Label>
                            <Textarea
                                rows={5}
                                type="text"
                                placeholder="Enter Welcome Message For Students (Max Length : 100 chars)"
                                id="welcomeMessage"
                                maxLength={400}
                                className='resize-none'
                                value={courseFormData?.welcomeMessage}
                                onChange={(e)=> handleCourseLandingFormDataChange("welcomeMessage", e.target.value)}
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 z-50">
                    <PricingModal
                        onChange={(e)=> handleCourseLandingFormDataChange("pricing", e.target.value)}
                        onChangeDiscount={(e)=> handleCourseLandingFormDataChange("discount", e.target.value)}
                        value={courseFormData?.pricing}
                        valueDiscount={courseFormData?.discount}
                        onCancel={()=> setOpenModal(false)}
                        onConfirm={handleConfirm}
                    />

                </div>
            )}
        </>

    );
}

export default CourseLanding;