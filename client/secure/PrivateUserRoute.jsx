import {useAuth} from "@/context/AuthContext.jsx";
import {Outlet , useLocation} from "react-router-dom";
import AuthRedirect from "@/utils/AuthRedirect.jsx";


function PrivateUserRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user && ![ "/login", "/signup" ].includes(location.pathname)) {
        return <AuthRedirect to={"/login"} message={"Please Login To Access Resources"} variant={"destructive"} />;
    }
    // Redirect authenticated users away from login and signup pages only
    if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
        return <AuthRedirect to={"/"} message={"You are Authenticated. Cannot Visit Login Page"} variant={"secondary"} />;
    }

    return children ? children : <Outlet/>
}
export default PrivateUserRoute