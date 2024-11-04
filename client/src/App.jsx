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


const socket = io('http://localhost:5000');

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
                </Route>
                {/*</Route>*/}

                {/*all admin Routes are here*/}
                <Route element={<ProtectedRouteChecker/>}>
                    <Route element={<PrivateAdminRoute/>}>
                        <Route path="/admin-dashboard" element={<AdminDashBoardPage/>}/>
                        <Route path="/create-new-course" element={<AdminCourseCreationPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </AppLayout>
    );
}

export default App;

