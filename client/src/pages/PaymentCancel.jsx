import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button.jsx";
import {Link , useNavigate} from "react-router-dom";
import {useEffect} from "react";

function PaymentCancel() {
    const navigate = useNavigate();
    const urlParamas = new URLSearchParams(window.location.search);
    const token = urlParamas.get("token");

    useEffect(() => {
        if(!token){
            navigate("/");
            return;
        }

        const verifySessionAPI = async ()=>{
            try{
                const res = await fetch(`/api/verify-cancel-payment?token=${token}`, {
                    method: "POST",
                    headers : {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if(!data?.success){
                    navigate("/");
                }
            }catch (e){
                console.log(e);
            }
        }
        verifySessionAPI();
    }, [token]);


    return(
        <div className="flex flex-col justify-center items-center gap-4 min-h-[100dvh]">
            <div className="w-full max-w-md bg-background rounded-lg p-8 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-4">
                    <img src="/cancel-seal.jpg" alt="Payment_cancel_image" className="w-32"/>
                    <h1 className="text-2xl font-semibold">
                        Payment Canceled
                    </h1>
                    <p className="text-muted-foreground">
                        There might be something wrong, or you have canceled the payment
                    </p>
                </div>
                <Separator className="my-6"/>
                <div>
                    No Amount has been Deducted from your account
                </div>
                <Separator className="my-6"/>
                <Link to={"/"}>
                    <Button className="w-full">
                        Back To Home
                    </Button>
                </Link>



            </div>
        </div>
    )
}

export default PaymentCancel;