import {useAuth} from "@/context/AuthContext.jsx";
import {Outlet} from "react-router-dom";
import AuthRedirect from "@/utils/AuthRedirect.jsx";
import {useLocation} from "react-router-dom";


function PrivateAdminRoute({ children}) {
    const { user } = useAuth();
    const location = useLocation();
    if(!user && !location.pathname.includes("/login")){
        return <AuthRedirect to={"/login"} message={"Please Login To Access Resources"} variant={"secondary"} />
    }
    if(user && user?.role !== "admin"){
        return <AuthRedirect to={"/"} message={"You Cannot Access Admin Route"} variant={"destructive"} />
    }
    // Redirect authenticated users away from login and signup pages only
    if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
        return <AuthRedirect to={"/"} message={"You are Authenticated. Cannot Visit Login Page"} variant={"secondary"} />;
    }
    return children ? children : <Outlet />;
}

export default PrivateAdminRoute;


