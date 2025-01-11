import { Instagram , Linkedin , Github} from 'lucide-react';
import {Link} from "react-router-dom";
function Footer(){
    return(
        <div className="max-w-7xl mx-auto p-4 text-white font-medium flex justify-between items-center">
            Created And Developed By Vinay Prajapati❤️
            <div className="flex items-center gap-5 cursor-pointer">
                <Link to={"https://www.linkedin.com/in/vinay-prajapati-3329b3289/"}>
                <Linkedin/>
                </Link>
                <Instagram/>
                <Link to={'https://github.com/thorreactdev'}>
                <Github/>
                </Link>

            </div>
        </div>
    )
}

export default Footer;