import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleX } from "lucide-react";
import {Link} from "react-router-dom";


function CourseOrReceipt({ onClose ,onDownload , OnViewCourse , courseId}) {
    async function handleSubmit(){
        await onDownload();
        await onClose();
    }

    console.log(courseId);





    return (
        <AlertDialog open={true} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>View Course Or Download Receipt</AlertDialogTitle>
                    <AlertDialogDescription>
                        Here , You can Download Receipt or View the Course details..
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="" onClick={handleSubmit}>Download receipt</AlertDialogAction>
                    <Link to={`/course-progress-page/${courseId}`} onClick={onClose}>
                    <Button>
                        View Course
                    </Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default CourseOrReceipt;