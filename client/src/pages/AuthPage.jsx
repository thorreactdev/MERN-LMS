import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext.jsx";
import OAuth from "@/components/OAuth.jsx";
import Loader from "@/utils/Loader.jsx";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";

function AuthPage() {
    const [formData, setFormData] = useState({});
    const [isGoogleButtonClick, setIsGoogleButtonClick] = useState(false);
    const {handleSignup, loading} = useAuth();
    const handleChange = (e) => {
        setFormData((prevData) => ({...prevData, [e.target.id]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignup(formData);
    }
    return (
        <div className="">
            {isGoogleButtonClick && (
                <Loader loadingText="It May Take Few Minute Please Wait Don't Go Back🙌😁..."/>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center mt-8 lg:mt-0">
                <div className="order-last lg:order-first">
                    <img src="/bg-layer.jpg" alt="" className="min-h-[50vh] lg:min-h-screen"/>
                </div>
                <div className="flex flex-col gap-6 max-w-lg mx-auto px-3 md:px-0">
                    <div className={"flex flex-col gap-1"}>
                        <h1 className="text-2xl font-semibold">Create an account👍</h1>
                        <span className="text-base">
                    Welcome To Our Sunshine Coaching.Please Register Here🚀🚀.
                </span>
                    </div>
                    <form className="flex flex-col gap-4 px-3 md:px-0" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label>User Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter Your User Name"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
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
                            {loading ? <SpinnerLoader loadingText={"Creating Account..."}/>: "Submit"}
                        </Button>
                    </form>
                    <OAuth setIsGoogleButtonClick={setIsGoogleButtonClick}/>
                    <div className="px-3 md:px-0">
                        <p className={"capitalize text-sm text-right"}>
                            Already Have an account ? <Link to={"/login"} className={"text-blue-500 hover:underline"}>click
                            to login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;