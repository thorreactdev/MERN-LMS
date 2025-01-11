import {Card, CardContent, CardHeader, CardDescription, CardTitle} from "@/components/ui/card.jsx";
import {PlusCircleIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.jsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Link, useNavigate} from "react-router-dom";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";
import {useAdmin} from "@/context/AdminContext.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {useAuth} from "@/context/AuthContext.jsx";
import {useEffect, useState} from "react";
import Loader from "@/utils/Loader.jsx";
import {courseCurriculumInitialFormData, courseLandingInitialFormData} from "@/data/initialFormData.js";
import UserControllerModel from "@/models/UserControlledModal.jsx";

function AdminCoursePage() {
    const {toast} = useToast();
    const [deleteCourseID, setDeleteCourseID] = useState(null);
    const [isDeleteCoursePopupOpen, setIsDeleteCoursePopupOpen] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();
    const {
        loading,
        setLoading,
        getAdminCourseList,
        setGetAdminCourseList,
        setCourseFormData,
        setCourseCurriculum
    } = useAdmin();

    useEffect(() => {
        handleGetAdminCourseList();
    }, [isDeleteCoursePopupOpen]);

    console.log(getAdminCourseList);

    async function handleGetAdminCourseList() {
        try {
            setLoading(true);
            const res = await fetch(`/api/get-admin-course/${user?._id}`);
            const data = await res.json();
            if (data?.success) {
                setGetAdminCourseList(data?.courseData);
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive"
                });
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    //handle Delete Functionality of Course
    async function handleDeleteCourse() {
        try {
            setLoading(true);
            const res = await fetch(`/api/delete-course/${user?._id}/${deleteCourseID}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data?.success) {
                toast({
                    title: data?.message
                })
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive"
                })
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading || !getAdminCourseList ? (
                <Loader loadingText={"Loading..."}/>
            ) : (
                <Card>
                    <CardHeader className="flex justify-between flex-row items-center">
                        <CardTitle className="text-lg lg:text-2xl font-bold">
                            All Uploaded Courses
                        </CardTitle>
                        <Button className="lg:p-6" onClick={() => {
                            setCourseFormData(courseLandingInitialFormData);
                            setCourseCurriculum(courseCurriculumInitialFormData);
                            navigate("/create-new-course");
                        }}>
                            <PlusCircleIcon className="w-7 h-7 text-white "/> Create New Course
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="text-xs lg:text-sm">
                                <TableCaption></TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={"cursor-pointer"}>
                                    {getAdminCourseList && getAdminCourseList?.length > 0 ? (
                                        getAdminCourseList?.map((course) => (
                                            <TableRow>
                                                <TableCell className="font-medium">{course?.courseTitle}</TableCell>
                                                <TableCell>
                                                    <Link to={`/course/details/${course?._id}`}>
                                                    <img src={course?.image} alt="Course Thumbnail" className="w-10"/>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{getAdminCourseList && course?.students?.length}</TableCell>
                                                <TableCell>${course?.students?.length * course?.disCountedPrice }</TableCell>
                                                <TableCell className="text-right">
                                                    <Link to={`/edit-course/${course?._id}`}>
                                                        <Button variant="ghost" size="sm" title={"click To edit"}>
                                                            <PencilSquareIcon className="mr-1"/>
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="sm" title={"Click To Delete"}
                                                            onClick={() => {
                                                                setDeleteCourseID(course._id);
                                                                setIsDeleteCoursePopupOpen(true);
                                                            }}
                                                    >
                                                        <TrashIcon/>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : null}

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4}>Total</TableCell>
                                        <TableCell className="text-right">{
                                            getAdminCourseList?.reduce((total, course)=> {
                                                return total + (course?.students?.length * course?.disCountedPrice);
                                            },0).toFixed(2)
                                        }</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>

                        </div>
                    </CardContent>
                </Card>
            )}
            {isDeleteCoursePopupOpen && (
                <UserControllerModel
                    title="Delete Course"
                    description={"Are you sure you want to delete this course? This action cannot be undone, and all associated content and data will be permanently removed. If you're certain, click 'Delete'; otherwise, click 'Cancel' to go back."}
                    confirmationText={"Delete Course"}
                    navigateToPage={"/admin-dashboard"}
                    onConfirm={handleDeleteCourse}
                    onClose={() => setIsDeleteCoursePopupOpen(false)}
                    loading={loading}

                />
            )}
        </>
    )
}

export default AdminCoursePage;
