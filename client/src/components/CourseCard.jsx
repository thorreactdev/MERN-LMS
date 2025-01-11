import {Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle} from "@/components/ui/card.jsx";
import {useLocation} from "react-router-dom";

function CourseCard(props) {
    const location = useLocation();
    return (
        <Card className="hover:shadow-2xl transition-all duration-300 ease-in-out">
            <img src={props?.image} alt={"hello"} className="overflow-hidden rounded-t-xl" loading={"lazy"}/>
            <div>
                <CardHeader className="flex flex-col gap-1">
                    <CardTitle className="leading-6 font-semibold">
                        {props?.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                        {props?.description}
                    </CardDescription>
                </CardHeader>

                <CardFooter className="flex gap-4">
                    <span className="font-medium">
                     ${props?.disCountedPrice}
                    </span>
                    <span className="line-through text-gray-500 font-medium">
                       {location?.pathname === "/my_courses" ? "" :`(${props?.pricing})`}
                    </span>
                </CardFooter>
            </div>

        </Card>
    )
}

export default CourseCard;