import {Button} from "@/components/ui/button.jsx";
import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, getAuth, getRedirectResult} from 'firebase/auth';
import {app} from "../../firebase/fireBaseConfig.js";
import {useToast} from "@/hooks/use-toast.js";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext.jsx";

function OAuth({setIsGoogleButtonClick}) {
    const {handleGoogleLogin, loading} = useAuth();
    const {toast} = useToast();
    const auth = getAuth(app);


    const handleGoogleClick = async () => {
        try {
            setIsGoogleButtonClick(true);
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);

            await handleGoogleLogin({
                username: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsGoogleButtonClick(false);
        }
    }
    return (
        <div>
            <Button onClick={handleGoogleClick}
                    className="w-full bg-white text-black border flex gap-3 items-center hover:bg-gray-200" size="lg">
                <img src="/google.webp" alt="Google Logo" className="w-7 h-7 bg-gray-100 p-1 rounded-full"/>
                Login with Google
            </Button>
        </div>
    )
}

export default OAuth;