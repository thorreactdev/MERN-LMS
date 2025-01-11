import {Toaster} from "@/components/ui/toaster.jsx";
import Header from "@/components/Header.jsx";
import {useLocation} from "react-router-dom";
import Footer from "@/components/Footer.jsx";

const AppLayout = ({children}) => {
    const location = useLocation();
    const hideHeaderRoutes = ["/cancel_payment", "/success"];
    const hideFooters = ["/create-new-course", "/admin-dashboard" , "/my_courses", "/cancel_payment", "/success"]
    const isCourseProgressPage = location?.pathname.startsWith("/course-progress-page/");

    return (
        <>
            <Toaster/>
            <header className="w-full sticky top-0 left-0 z-50">
                {!hideHeaderRoutes.includes(location?.pathname) && !isCourseProgressPage && <Header />}
            </header>
                <main>
                    {children}
                </main>
            <footer className="bg-black">
                {!hideFooters.includes(location?.pathname) && !isCourseProgressPage && <Footer/>}
            </footer>
        </>
    )
}

export default AppLayout;