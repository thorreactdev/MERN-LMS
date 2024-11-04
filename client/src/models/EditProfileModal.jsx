import { Button } from "@/components/ui/button"
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth} from "@/context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast.js";
import {LinearProgress } from '@mui/material';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";
import {AlertCircle, Terminal} from "lucide-react";
import SpinnerLoader from "@/utils/SpinnerLoader.jsx";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB in bytes

function EditProfileModal({ onClose , onConfirm }) {
    const {user, loading} = useAuth();
    const {toast} = useToast();
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const[uploadSuccess , setUploadSuccess] = useState(false);


    console.log(formData);

    //function to track the changes
    const handleChange = (e) => {
        setFormData((prevData) => ({...prevData, [e.target.id]: e.target.value}));
    }

    // function to track the change of profile pic
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            // Check if file size is within the 3 MB limit
            if (file.size > MAX_FILE_SIZE) {
                setError("File size should not exceed 3 MB.");
                return;
            } else {
                setError(null); // Clear error if file is valid
                setImageFile(file);
                setImageFileURL(URL.createObjectURL(file));
            }
        }
    }

        // function to upload the image to cloudinary storage
        const uploadImage = async () => {
            try {
                if(!imageFile) return;
                setUploading(true);
                const uploadData = new FormData();
                uploadData.append("file", imageFile);
                uploadData.append("upload_preset", "kyabaathai");
                // uploadData.append("cloud_name", "dr521sts8");

                const res = await fetch("https://api.cloudinary.com/v1_1/dr521sts8/image/upload", {
                    method: "POST",
                    body: uploadData,
                });
                const data = await res.json();
                setFormData({...formData, avatar: data?.secure_url});
            } catch (e) {
                setUploading(false);
                console.log(e);
            } finally {
                setUploadSuccess(true);
                setUploading(false);
            }
        }

        useEffect(() => {
            if (imageFile) {
                uploadImage();
            }
        }, [imageFile]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Object.keys(formData).length === 0) {
                toast({
                    title: "No Changes Made",
                });
                return;
            }
            await onConfirm(formData);
        }


        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 items-center gap-3">
                            <Label htmlFor="username">
                                Username
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                defaultValue={user && user?.username}
                                className="col-span-4"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-3">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                defaultValue={user && user?.email}
                                className="col-span-4"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-3">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                defaultValue=""
                                className="col-span-4"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                            <Label htmlFor="upload">
                                Upload Profile
                            </Label>
                            <Input
                                type="file"
                                accpet="image/*"
                                id="upload"
                                defaultValue=""
                                className="col-span-4"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            {!error && uploading && (
                                <div>
                                    <LinearProgress/>
                                </div>
                            )}
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        {!error && uploadSuccess && !uploading && (
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    Upload Successful
                                </AlertDescription>
                            </Alert>
                        )}
                        <DialogFooter>
                            <Button type="submit"
                                    disabled={loading || uploading}>{loading ? <SpinnerLoader loadingText="Updating..."/>: "Save Changes"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

export default EditProfileModal;
