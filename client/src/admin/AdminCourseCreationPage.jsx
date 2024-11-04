import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import CourseCurriculum from "@/admin/components/CourseCurriculum.jsx";
import CourseLanding from "@/admin/components/CourseLanding.jsx";
import CourseSettings from "@/admin/components/CourseSettings.jsx";

function AdminCourseCreationPage() {
    return (
        <div className="w-full md:max-w-7xl mx-auto p-3 mt-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-extrabold">
                    Create a new course
                </h1>
                <Button size="lg" className="uppercase text-sm tracking-wider">
                    Submit Data
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
    );
}

export default AdminCourseCreationPage;