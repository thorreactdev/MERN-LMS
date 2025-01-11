import {useState, useEffect} from "react";
import {useAuth} from "@/context/AuthContext.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {Button} from "@/components/ui/button.jsx";
import CourseCard from "@/components/CourseCard.jsx";
import CourseOrReceipt from "@/models/CourseOrReceipt.jsx";
import {useNavigate} from "react-router-dom";

function MyCourse() {
    const [coursePurchasedData , setCoursePurchasedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const[modalOpen , setModalOpen] = useState(null);
    const[isOpen , setIsOpen] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    async function getCoursePurchasedData() {
        try{
            setLoading(true);
            const res = await fetch(`/api/student-purchased-course/${user?._id}`);
            const data = await res.json();
            console.log(data);
            if(data?.success){
                setCoursePurchasedData(data?.course);
                // toast({
                //     title: "Success",
                // })
            }else{
                toast({
                    title: data?.message,
                    variant: "destructive"
                })
                setLoading(false);
            }
        }catch (e){
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    function handleReceiptDownload(index){
        const link = document.createElement("a");
        link.href = coursePurchasedData[index]?.receiptURL;
        link.setAttribute("target", "_blank");
        link.setAttribute("download", `receipt_${coursePurchasedData?._id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }


    async function closeModal(){
        await setIsOpen(false);
       await setModalOpen(null);
    }

    useEffect(()=>{
      getCoursePurchasedData();
    },[]);
    return(
        <div>
            {
                loading ? (
                    <p>Loading....</p>
                ) : (
                    <>
                        <div className="bg-gradient-to-r from-teal-700 to-teal-500 text-white h-[150px] text-3xl font-medium text-center flex items-center justify-center">
                            Your Purchased Courses
                        </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 cursor-pointer max-w-7xl mx-auto my-5">
                        {coursePurchasedData && coursePurchasedData?.map((item, index)=>(
                            <div key={item?._id}
                                 onClick={()=>{
                                     setModalOpen(index);
                                     setIsOpen(true);
                                 }}
                            >
                                <CourseCard
                                    title={item?.courseTitle}
                                    image={item?.courseImage}
                                    author={item?.instructorName}
                                    // pricing={item?.coursePricing}
                                    description={item?.description}
                                    level={item?.level}
                                    disCountedPrice={item?.coursePricing}
                                />
                                {
                                    modalOpen === index && isOpen &&(
                                        <CourseOrReceipt
                                            onClose={()=> closeModal()}
                                            onDownload={()=> handleReceiptDownload(index)}
                                            courseId={item?.courseId}
                                        />
                                    )
                                }
                            </div>

                        ))}
                    </div>
                    </>
                )
            }


        </div>
    )
}
export default MyCourse;