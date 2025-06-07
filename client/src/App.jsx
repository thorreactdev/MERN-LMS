import AppLayout from "../layout/AppLayout.jsx";
import AuthPage from "@/pages/AuthPage.jsx";
import About from "@/pages/About.jsx";
import HomePage from "@/pages/HomePage.jsx";
import AuthenticationPage from "@/pages/AuthenticationPage.jsx";
import {Routes, Route} from "react-router-dom";
import {io} from "socket.io-client";
// import {useToast} from "@/hooks/use-toast.js";
import {useEffect} from "react";
import {toast} from "react-toastify";
import ProtectedRouteChecker from "../secure/ProtectedRouteChecker.jsx";
import PrivateAdminRoute from "../secure/PrivateAdminRoute.jsx";
import AdminDashBoardPage from "@/admin/AdminDashBoardPage.jsx";
import PrivateUserRoute from "../secure/PrivateUserRoute.jsx";
import ProfilePage from "@/pages/ProfilePage.jsx";
import ErrorPage from "@/components/ErrorPage.jsx";
import AdminCourseCreationPage from "@/admin/AdminCourseCreationPage.jsx";
import CoursePage from "@/pages/CoursePage.jsx";
import CourseDetailsPage from "@/pages/CourseDetailsPage.jsx";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage.jsx";
import MyCourse from "@/user/MyCourse.jsx";
import PaymentCancel from "@/pages/PaymentCancel.jsx";
import CourseProgressPage from "@/pages/CourseProgressPage.jsx";


const socket = io('https://mern-lms-z3ed.onrender.com');

function App() {
    // const { toast } = useToast();
    useEffect(() => {
        // Listen for registration success events
        socket.on('registrationSuccess', (data) => {
            console.log(data?.message);
            toast.info(data?.message);
        });

        // Cleanup on unmount
        return () => {
            socket.off('registrationSuccess');
        };
    }, []);

    return (
        <AppLayout>
            <Routes> {/* Use Routes and Route to define routes */}
                {/*global routes accessible to all*/}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/course_page" element={<CoursePage/>}/>


                {/*all user related routes are here*/}
                {/*<Route element={<ProtectedRouteChecker/>}>*/}
                <Route element={<PrivateUserRoute/>}>
                    <Route path="/profile_page" element={
                        <ProtectedRouteChecker>
                            <ProfilePage/>
                        </ProtectedRouteChecker>
                    }/>
                    <Route path="/login" element={<AuthenticationPage/>}/>
                    <Route path="/signup" element={<AuthPage/>}/>
                    <Route path="/course/details/:id" element={<CourseDetailsPage/>}/>
                    <Route path="/success" element={<PaymentSuccessPage/>}/>
                    <Route path="/cancel_payment" element={<PaymentCancel/>}/>
                    <Route path="/my_courses" element={<MyCourse/>}/>
                    <Route path="/course-progress-page/:id" element={<CourseProgressPage/>}/>
                </Route>
                {/*</Route>*/}

                {/*all admin Routes are here*/}
                <Route element={<ProtectedRouteChecker/>}>
                    <Route element={<PrivateAdminRoute/>}>
                        <Route path="/admin-dashboard" element={<AdminDashBoardPage/>}/>
                        <Route path="/create-new-course" element={<AdminCourseCreationPage/>}/>
                        <Route path="/edit-course/:courseID" element={<AdminCourseCreationPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </AppLayout>
    );
}

export default App;

