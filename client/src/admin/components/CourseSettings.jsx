import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
function CourseSettings() {
    return(
        <Card>
            <CardHeader>
                <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 mt-2">
                    <Label>Upload The Course Thumbnail</Label>
                    <Input
                        type="file"
                        accept="image/*"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
export default CourseSettings;