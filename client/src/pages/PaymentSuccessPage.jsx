import {useEffect, useState} from "react";
import {useStudent} from "@/context/StudentContext.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {Separator} from "@/components/ui/separator";
import moment from "moment";
import {Button} from "@/components/ui/button.jsx";
import {Link , useNavigate} from "react-router-dom";
import Chip from "@mui/material/Chip";
import {CheckCircle} from "lucide-react";
import {useAuth} from "@/context/AuthContext.jsx";


function PaymentSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams?.get("session_id");
    const orderId = urlParams?.get("orderId");
    const courseId = urlParams?.get("courseId");
    const {user} = useAuth();
    const {toast} = useToast();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(courseId);

    useEffect(() => {
        const fetchOrderDetailsFromStripe = async () => {
            try {
                setLoading(true);
                if (!sessionId) {
                    navigate("/");
                    return;
                }
                const res = await fetch(`/api/verify-payment?sessionId=${sessionId}&orderId=${orderId}&courseId=${courseId}`);
                const data = await res.json();
                console.log(data?.data?.paymentIntent?.payment_method_types[0]);
                if (data?.data?.orderDataFromStripe?.payment_status === "paid" && data?.data?.orderDataFromStripe?.status === "complete") {
                    const paymentPayLoad = {
                        paymentMethod: data?.data?.paymentIntent?.payment_method_types[0],
                        paymentStatus: data?.data?.orderDataFromStripe?.payment_status,
                        paymentId: data?.data?.orderDataFromStripe?.payment_intent,
                        orderStatus: data?.data?.orderDataFromStripe?.status,
                        sessionId: data?.data?.orderDataFromStripe?.id,
                        orderId: data?.data?.orderId,

                    }
                    const res2 = await fetch(`/api/capture-final-payment`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(paymentPayLoad)
                    });
                    const data2 = await res2.json();
                    console.log(data2, "data from paysuccesspage");
                    if (data2?.success) {
                        setOrderData(data2?.data);
                    } else {
                        toast({
                            title: data2?.message,
                            variant: "destructive"
                        });
                        setLoading(false);
                    }
                }
            } catch (e) {
                console.log(e);
            }finally {
                setLoading(false);
            }
        }

        const generateReceipt = async ()=>{
            try {
                const res = await fetch(`/api/generate-receipt/${user?._id}/${courseId}`,{
                    method : "POST",
                    headers :{
                        "Content-Type" : "application/json",
                    }
                });
                const data = await res.json();
                console.log(data);
                if(data?.success){
                alert(data?.message);

                }
            }catch (e) {
                console.log(e);
            }
        }

        fetchOrderDetailsFromStripe();
        generateReceipt();
    }, [sessionId]);

    return (
        <div>
            {loading ?
                (
                    <div className="flex items-center flex-col gap-4 justify-center min-h-[100dvh]">
                        <div className="flex flex-col gap-3 items-center">
                            <img src="/free-store.png" alt="Free_Store_Images" className="w-20"/>
                            <div className="flex flex-col items-center gap-2">
                                <p className='text-xl font-semibold'>
                                    Processing Your Payment Please Wait ...
                                </p>
                                <span className="text-muted-foreground">
                                It May Takes Few Seconds
                            </span>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="flex flex-col justify-center items-center min-h-[100dvh] px-4">
                        <div className="bg-background w-full max-w-xl shadow-lg rounded-lg p-8">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <img src="/verified_payment.png" alt="Payment_Success_Image" className="w-20"/>
                                <h1 className="text-2xl font-bold">
                                    Payment Successful
                                </h1>
                                <p className="text-muted-foreground">Thank you for your purchase! Your order is being
                                    processed.</p>
                            </div>
                            <Separator className="my-6"/>
                            <div className="grid gap-3">
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Order ID
                                    </span>
                                    <span className="text-sm">
                                        #{orderData?._id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Transaction ID
                                    </span>
                                    <span className="text-sm">
                                        #{orderData?.paymentId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Amount Paid
                                    </span>
                                    <span className="text-sm">
                                        ${orderData?.coursePricing}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Payment Method
                                    </span>
                                    <span className="text-sm">
                                        {orderData?.paymentMethod === "amazon_pay" ? "Amazon Pay" : "Visa Card"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Order Date
                                    </span>
                                    <span className="text-sm">
                                       {moment(orderData?.orderDate).format("D MMM, YYYY")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        User Email
                                    </span>
                                    <span className="text-sm">
                                       {orderData?.userEmail}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        User ID
                                    </span>
                                    <span className="text-sm">
                                       #{orderData?.userId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center  text-base font-medium">
                                    <span className="text-muted-foreground">
                                        Payment Status
                                    </span>
                                    <span className="text-sm">
                                        <Chip icon={<CheckCircle className="w-4 h-4 text-green-500"/>} label={"Success"}
                                        />
                                    </span>
                                </div>
                            </div>
                            <Separator className="my-6"/>
                            <Link to={`/my_courses`}>
                                <div className="flex items-center justify-center">
                                    <Button className="text-center text-sm w-full">
                                        Go To My Courses
                                    </Button>
                                </div>
                            </Link>

                        </div>

                    </div>

                )}
        </div>
    )
}

export default PaymentSuccessPage;