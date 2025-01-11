import {Navigate, useParams} from "react-router-dom";
import {useStudent} from "@/context/StudentContext.jsx";
import {useEffect, useState} from "react";
import {CheckCircle, Globe, Lock, PlayCircle, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import VideoPlayer from "@/components/VideoPlayer.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import {useAuth} from "@/context/AuthContext.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {useToast} from "@/hooks/use-toast.js";
import CourseDetailsSkeleton from "@/utils/CourseDetailsSkeleton.jsx";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";

function CourseDetailsPage() {
    const {id} = useParams();
    const {singleCourseData, getSingleCourseList, loading , buyNowLoading, setBuyNowLoading} = useStudent();
    const [freePreviewLectureDialog, setFreePreviewLectureDialog] = useState(false);
    const [freePreviewData, setFreePreviewData] = useState(null);
    const { handleMakePayment } = useStudent();
    const { user } = useAuth();
    const { toast } = useToast();



    async function handlePayment(){
        const stripe = await loadStripe(" pk_test_51QTLI8JqA2Rd5c42h3Gy7riBo8YHB5V0UKwqMpUsQSZqAs1ujL0BKDAGTuggBv4udpJQePaL1z6dnln2jxRIZu5o00aElUmXOd\n");
        const paymentPayLoad={
            userId : user?._id ,
            userName : user?.name,
            userEmail : user?.email ,
            orderStatus : "pending",
            paymentMethod : "Not Found" ,
            paymentStatus : "Not Paid" ,
            orderDate : new Date(),
            paymentId : "",
            instructorId : singleCourseData?.adminID,
            instructorEmail : "prajapativinay140404@gmail.com",
            instructorName : singleCourseData?.instructorName,
            courseImage : singleCourseData?.image,
            courseTitle : singleCourseData?.courseTitle ,
            courseId : singleCourseData?._id,
            coursePricing : singleCourseData?.disCountedPrice ,
            description : singleCourseData?.description,
            sessionId : "",
            receiptURL : "",
        };
        const data = await handleMakePayment(paymentPayLoad);
        const sessionId = data?.sessionId;
        if(data?.success){
            await stripe.redirectToCheckout({ sessionId });
        }
    }


    useEffect(() => {
        if (id !== null && id !== "") {
            getSingleCourseList(id , user?._id);
        }
    }, [id]);



    return (
        <>
            {loading ? (
                <CourseDetailsSkeleton/>
            ) : (
                singleCourseData && (
                    <div className="min-h-screen">
                        <div className="p-4">
                            <div
                                className="rounded-md bg-gray-100 p-8  shadow-md flex items-center">
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-4">{singleCourseData?.courseTitle}</h1>
                                    <p className="text-sm max-w-5xl mb-4 line-clamp-3">
                                        {singleCourseData?.description}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-2 text-sm uppercase">
                                    <span>
                                        Created By : {singleCourseData?.instructorName}
                                    </span>
                                        <span>
                                        Created On : {singleCourseData?.createdAt.split("T")[0]}
                                    </span>
                                        <span className={"flex items-center text-sm gap-1"}>
                                        <Globe className="w-4 h-4"/> {singleCourseData?.primaryLanguage}
                                    </span>
                                        <span className={"flex items-center text-sm gap-1"}>
                                        <Users className="w-4 h-4"/>
                                            {singleCourseData?.students?.length} {singleCourseData?.students?.length <= 1 ? "Student" : "Students"} enrolled
                                    </span>
                                    </div>
                                </div>
                                <div className="w-[350px] cursor-pointer">
                                    <img src={singleCourseData?.image} alt={singleCourseData?.subtitle}
                                         className="rounded-md object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 md:flex-row mt-8">
                                <main className="flex-grow">
                                    <Card className={"mb-8  border-[.1px]"}>
                                        <CardHeader>
                                            <CardTitle>Welcome Message For Students</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-black">
                                                {singleCourseData?.welcomeMessage}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mb-8 border-[.1px]">
                                        <CardHeader>
                                            <CardTitle>
                                                What You'll Learn
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                                                {singleCourseData?.objectives?.split(",")?.map((obj, index) => (
                                                    <li className="flex gap-2 items-center" key={index}>
                                                        <CheckCircle className="w-5 h-5 text-green-500"/>
                                                        <span className="text-sm">
                                                        {obj}
                                                    </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-[.1px]">
                                        <CardHeader>
                                            <CardTitle>
                                                Course Curriculum
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul>
                                                {singleCourseData?.curriculum?.map((curr, index) => (
                                                    <li key={index}
                                                        className={`${curr?.freePreview ? "cursor-pointer" : "cursor-not-allowed"} flex items-center gap-2 mt-2`}
                                                        onClick={curr?.freePreview ? () => {
                                                            setFreePreviewData(curr?.videoURL);
                                                            setFreePreviewLectureDialog(true);
                                                        } : null}
                                                    >
                                                        {curr?.freePreview ? <PlayCircle className="w-5 h-5"/> :
                                                            <Lock className="w-5 h-5"/>}
                                                        <span>
                                                        {curr?.title}
                                                    </span>
                                                    </li>

                                                ))}
                                            </ul>
                                        </CardContent>

                                    </Card>
                                </main>
                                <aside className="w-full md:w-[500px]">
                                    <Card className="sticky border-[.1px]">
                                        <CardHeader>
                                            <CardTitle>
                                                Free Preview Of Lecture
                                            </CardTitle>
                                            <CardDescription>
                                                You can watch the free preview and decide to buy the course..
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="aspect-video mb-4">
                                                <VideoPlayer url={
                                                    singleCourseData?.curriculum?.find(item => item?.freePreview)?.videoURL || ""}
                                                             width={"460px"}
                                                             height={"250px"}
                                                />
                                            </div>
                                            <div className="mb-4 flex items-center gap-4 ml-3">
                                            <span className="text-xl font-bold">
                                                ${singleCourseData?.disCountedPrice}
                                            </span>
                                                <span className="line-through text-gray-400">
                                                (${singleCourseData?.pricing})
                                            </span>
                                            </div>
                                            <div>
                                                <Button onClick={handlePayment} className="w-full text-black" variant="outline">
                                                    {buyNowLoading ? <SpinnerLoader loadingText={"Processing..."}/> : "Buy Now"}
                                                </Button>
                                            </div>
                                        </CardContent>

                                    </Card>
                                    <Card className="mt-4 p-2 bg-red-100">
                                        <CardContent>
                                            <p className="text-sm">
                                                NOTE : Once you purchase the course their is <span
                                                className="bg-yellow-500 px-2">no refund back. </span>But our platform
                                                make sure that you will not regret after buying the course.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </aside>
                            </div>
                            <Dialog open={freePreviewLectureDialog} onOpenChange={setFreePreviewLectureDialog}>
                                <DialogContent className={"w-[800px]"}>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Free Preview Of Course Lecture
                                        </DialogTitle>
                                        <DialogDescription>
                                            You can watch the free preview and decide to buy the course..
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div>
                                        <VideoPlayer
                                            url={freePreviewData}
                                            width={"460px"}
                                            height={"250px"}

                                        />
                                        <div className="flex flex-col mt-5 mb-3">
                                            {singleCourseData?.curriculum?.filter(item => item?.freePreview)?.map(filteredItem => (
                                                <span className="flex items-center gap-2 cursor-pointer font-medium"
                                                      onClick={() => {
                                                          setFreePreviewData(filteredItem?.videoURL)
                                                      }}
                                                >
                                                <PlayCircle className="w-5 h-5"/>
                                                    {filteredItem?.title}
                                                    {freePreviewData === filteredItem?.videoURL && (
                                                        <span className="bg-green-200 px-2">
                                                        Currently Playing
                                                        </span>
                                                    )}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button type="button" variant=""
                                                    onClick={() => {
                                                        setFreePreviewData(null);
                                                        setFreePreviewLectureDialog(false);
                                                    }}
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default CourseDetailsPage;