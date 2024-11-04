import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext.jsx";
import OAuth from "@/components/OAuth.jsx";
import {useState} from "react";
import Loader from "@/utils/Loader.jsx";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";


function AuthenticationPage() {
    const[formData , setFormData] = useState({});
    const[isGoogleButtonClick , setIsGoogleButtonClick] = useState(false);
    const{ handleLogin , loading } = useAuth();

    // manages the changes in the form Data
    const handleChange = (e) =>{
        setFormData((prevData)=> ({ ...prevData,[e.target.id]: e.target.value}));
    }

    console.log(formData);

    //Call the function from Context and send request to API
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await handleLogin(formData);
    }
    return (
        <div className="relative">
            {isGoogleButtonClick && (
                <Loader loadingText={"It May Take Few Minute Please Wait Don't Go Back🙌😁..."}/>
            )}
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center mt-6 lg:mt-0">
                <div className="order-last lg:order-first">
                    <img src="/bg-layer.jpg" alt="" className="min-h-[50vh] lg:min-h-screen"/>
                </div>
                <div className="flex flex-col gap-6 max-w-lg mx-auto p-3 md:p-0">
                    <div className={"flex flex-col gap-1"}>
                        <h1 className="text-2xl font-semibold">Welcome Back👍</h1>
                        <span className="text-base">
                    Welcome To Our Sunshine Coaching.Please Login Here🚀🚀.
                </span>
                    </div>
                    <form className="flex flex-col gap-4 p-3 md:p-0" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter Your Email"
                                id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter Your Password"
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? <SpinnerLoader loadingText={"Wait Logging in..."}/> :"Submit"}
                    </Button>
                </form>
                <OAuth setIsGoogleButtonClick={setIsGoogleButtonClick} />
                <div>
                    <p className={"capitalize text-sm text-right"}>
                        Don't Have an account ? <Link to={"/signup"} className={"text-blue-500 hover:underline"}>click
                        to Register</Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AuthenticationPage