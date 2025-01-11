import {courseCategories} from "@/data/importantData.js";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
const CourseCategory = () => {
    const navigate = useNavigate();

    async function handleNavigateToCoursePage(getCurrentId){
        console.log(getCurrentId);
        localStorage.removeItem("filters");
        const currentFilters = {
            category : [getCurrentId],
        }
        localStorage.setItem("filters", JSON.stringify(currentFilters));
        navigate("/course_page");
    }
    return(
        <div className="max-w-7xl mx-auto my-10">
            <h2 className="text-center text-slate-700 mb-10 font-semibold text-[30px]">
                Course Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {courseCategories?.map((item)=>{
                    const Icon = item?.icon;
                    return(
                    <Button onClick={()=> handleNavigateToCoursePage(item?.id)} key={item?.id} variant="outline" className={`flex gap-2 items-center ${item?.color}`}>
                       <Icon/> {item?.label}
                    </Button>);
                })}

            </div>
        </div>
    )
};

export default CourseCategory;