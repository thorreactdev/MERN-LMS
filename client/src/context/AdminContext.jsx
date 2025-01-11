import React, {createContext, useContext, useState} from "react";
import {courseCurriculumInitialFormData, courseLandingInitialFormData} from "@/data/initialFormData.js";
import {useAuth} from "@/context/AuthContext.jsx";
import {useToast} from "@/hooks/use-toast.js";
import axios from "axios";


export const AdminContext = createContext(null);
export const AdminProvider = ({children}) => {
    const {user} = useAuth();
    const {toast} = useToast();
    const [courseCurriculum, setCourseCurriculum] = useState(courseCurriculumInitialFormData);
    const [courseFormData, setCourseFormData] = useState(courseLandingInitialFormData);
    const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
    const [mediaUploadingPercent, setMediaUploadPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [getAdminCourseList, setGetAdminCourseList] = useState([]);

    //function to send the request to backend and response gets a video url
    const handleVideoUploadBackend = async (formData, onProgressCallBack) => {
        try {
            setMediaUploadProgress(true);
            const res = await axios.post(`/api/upload/${user?._id}`, formData, {
                onUploadProgress: (progressEvent) => {
                    // Calculate the progress percentage
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgressCallBack(percentCompleted);
                },
            });

            console.log(res?.data, "from admin context");
            if (res?.data?.success) {
                toast({
                    title: res?.data?.message,
                });
                return res?.data;
            } else {
                toast({
                    title: res?.data?.message,
                    variant: "destructive",
                })
                setMediaUploadProgress(false);
            }
        } catch (e) {
            console.log(e, "error from catch block")
        } finally {
            setMediaUploadProgress(false);
        }
    }

    //function to handle Bulk Upload
    const handleBulkVideoUploadBackend = async (formData, onProgressCallBack) => {
        try {
            setMediaUploadProgress(true);
            const res = await axios.post(`/api/bulk-upload/${user?._id}`, formData, {
                onUploadProgress: (progressEvent) => {
                    // Calculate the progress percentage
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgressCallBack(percentCompleted);
                },
            });

            console.log(res?.data, "from admin context");
            if (res?.data?.success) {
                toast({
                    title: res?.data?.message,
                });
                return res?.data;
            } else {
                toast({
                    title: res?.data?.message,
                    variant: "destructive",
                })
                setMediaUploadProgress(false);
            }
        } catch (e) {
            console.log(e, "error from catch block")
        } finally {
            setMediaUploadProgress(false);
        }
    }


    //function to delete the cloudinary asset backend api call
    async function handleDeleteCurrentMedia(publicID) {
        try {
            setLoading(true);
            const res = await fetch(`/api/delete/${publicID}/${user?._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const data = await res.json();
            if (data?.success) {
                toast({
                    title: data?.message,
                });
                return data;
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive",
                })
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    // function handle course creation backend request
    async function handleCourseCreation(formData) {
        try {
            setLoading(true);
            const res = await fetch(`/api/create-course/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data?.success) {
                toast({
                    title: data?.message,
                });
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive"
                });
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    // function to handle course updated data
    async function handleCourseUpdate(formData, courseID) {
        try {
            setLoading(true);
            const res = await fetch(`/api/update-course/${user?._id}/${courseID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            if (data?.success) {
                toast({
                    title: data?.message,
                });
            } else {
                toast({
                    title: data?.message,
                    variant: "destructive"
                });
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }
    }


    return (
        <AdminContext.Provider value={{
            setCourseCurriculum,
            courseCurriculum,
            mediaUploadProgress,
            setMediaUploadProgress,
            handleVideoUploadBackend,
            courseFormData,
            setCourseFormData,
            mediaUploadingPercent,
            setMediaUploadPercent,
            handleDeleteCurrentMedia,
            loading,
            handleCourseCreation,
            getAdminCourseList,
            setGetAdminCourseList,
            setLoading,
            handleCourseUpdate,
            handleBulkVideoUploadBackend
        }}>
            {children}
        </AdminContext.Provider>
    )
};
export const useAdmin = () => useContext(AdminContext);