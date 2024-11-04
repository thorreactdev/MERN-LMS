import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.jsx";
import {useAdmin} from "@/context/AdminContext.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";
import {courseCurriculumInitialFormData} from "@/data/initialFormData.js";

function CourseCurriculum() {
    const {courseCurriculum, setCourseCurriculum} = useAdmin();
    console.log(courseCurriculum);

    const handleAddLectureButton = () => {
        setCourseCurriculum([
            ...courseCurriculum,
            {
                ...courseCurriculumInitialFormData
            }
        ])
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleAddLectureButton}>
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
                                    id="videoTitle"
                                    className="max-w-96"
                                />
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={false}
                                        id="freePreview"
                                    />
                                    <Label>
                                        Free Preview
                                    </Label>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Input
                                    type="file"
                                    accept="video/*"

                                />
                            </div>

                        </div>
                    ))}

                </div>
            </CardContent>
        </Card>
    )
}

export default CourseCurriculum;