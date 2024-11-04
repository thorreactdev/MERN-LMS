import {useEffect} from "react";
import {useToast} from "@/hooks/use-toast.js";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "@/context/AuthContext.jsx";

function ProtectedRouteChecker({ children}) {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { handleSignOut } = useAuth();

    const handleTokenChecking = async ()=>{
        try{
            const res = await fetch("/api/auth/protected" , {
                method : "GET",
                credentials : "include",
                headers:{
                    Cookie : document.cookie
                }
            });
            const data = await res.json();
            if(!res.ok){
                if(data?.message === "Token Expired"){
                    toast({
                        title : "Token Expired Please Login Again",
                        description: "Your session has expired. Please log in again.",
                        variant: "destructive",
                    });
                    await handleSignOut();
                    navigate("/login");
                }else if(data?.message === "Invalid Token"){
                    toast({
                        title: "Invalid Token",
                        description: "Please log in to continue.",
                        variant: "destructive",
                    });
                    await handleSignOut();
                    navigate("/login");
                }else if(data?.message === "Token Not Found"){
                    toast({
                        title : "Token Not Found",
                        variant : "destructive",
                    });
                    setTimeout(async ()=> await handleSignOut() , 500);
                    navigate("/login");
                }
            }
        }catch (e){
            console.log(e);
        }
    }
    useEffect(()=>{
        handleTokenChecking();
    },[]);


    return children ? children : <Outlet/>;
}

export default ProtectedRouteChecker;