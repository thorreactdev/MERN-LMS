import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <p>This Page Does Not Exists.<Link to={"/"} className="text-blue-500 hover:underline" >Go Back To Home</Link></p>
    )
}
export default ErrorPage;
