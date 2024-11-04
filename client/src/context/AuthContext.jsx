import {createContext, useContext, useState} from "react";
import {useToast} from "@/hooks/use-toast.js";
import {useNavigate} from "react-router-dom";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const {toast} = useToast();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(false);

    // function to handle user registration
    const handleSignup = async (userData) => {
        try {
            setLoading(true);
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (res.ok) {
                toast({
                    title: data?.message,
                });
                setLoading(false);
                navigate("/login");
            } else {
                setLoading(false);
                toast({
                    title: data?.message,
                    variant: "destructive",
                })
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    // function to handle user Login
    const handleLogin = async (userInfo) => {
        try {
            setLoading(true);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data?.userData);
                localStorage.setItem("user",JSON.stringify(data?.userData));
                toast({
                    title: data?.message
                });
                setLoading(false);
                navigate("/");
            } else {
                setLoading(false);
                toast({
                    title: data?.message
                });
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    //function to handle google login
    const handleGoogleLogin = async (userInfo) => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setUser(data?.userData);
                localStorage.setItem("user",JSON.stringify(data?.userData));
                toast({
                    title: data?.message,
                });
                setLoading(false);
                navigate("/");
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive"
                });
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    // function to handle user signout
    const handleSignOut = async ()=>{
        try{
            console.log("Attempting to sign out");
            const res = await fetch(`/api/user/signout/${user?._id}`,{
                method: "POST",
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                setUser(null);
                localStorage.removeItem("user");
                toast({
                    title : data?.message
                })
                console.log("done removing");
                navigate("/");
            }else{
                toast({
                    title: data?.message,
                    variant : "destructive"
                })
            }
        }catch (e){
            console.log(e);
        }
    }

    //function to handle user update
    const handleUserUpdate = async (userInfo) => {
        try{
            setLoading(true);
            const res = await fetch(`/api/user/update/${user._id}`,{
                method : "PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            });
            const data = await res.json();
            if(res.ok){
                setUser(data?.userData);
                localStorage.setItem("user",JSON.stringify(data?.userData));
                toast({
                    title : data?.message
                });
                setLoading(false);
                navigate("/");
            }else{
                toast({
                    title: data?.message,
                    variant : "destructive"
                })
            }
        }catch (e){
            console.log(e);
        }finally {
            setLoading(false);

        }
    }


    return (
        <AuthContext.Provider value={{handleSignup, loading, handleLogin , handleGoogleLogin , user , handleSignOut , handleUserUpdate}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
