import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import EditProfileModal from "@/models/EditProfileModal.jsx";
import {useAuth} from "@/context/AuthContext.jsx";


function ProfilePage() {
    const[isDialogOpen , setIsDialogOpen] = useState(false);
    const { handleUserUpdate , loading } = useAuth();
    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
                <div className="order-last lg:order-first">
                    <img src="/bg-layer.jpg" alt="" className="min-h-[50vh] lg:min-h-screen"/>
                </div>
                <div className="flex flex-col gap-6 max-w-lg mx-auto p-3 md:p-0 mt-8">
                    <div className={"flex flex-col gap-1"}>
                        <h1 className="text-2xl font-semibold">Edit Your Profile👍</h1>
                        <span className="text-base">
                    Welcome To Our Sunshine Coaching. You Can Edit Your Profile.🚀.
                </span>
                    </div>
                    <div >
                        <Button className="w-full" size="lg" onClick={()=> setIsDialogOpen(true)} >
                            Click To Edit Your Profile ✏️
                        </Button>
                    </div>
                </div>
            </div>
            {isDialogOpen && (
                <EditProfileModal onClose={()=> setIsDialogOpen(false)} onConfirm={handleUserUpdate} />
            )}
        </div>
    )
}

export default ProfilePage;