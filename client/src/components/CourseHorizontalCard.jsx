import {Card , CardHeader , CardFooter , CardDescription ,CardContent , CardTitle} from "@/components/ui/card.jsx";
import Chip from "@mui/material/Chip";
import {StarIcon} from "lucide-react";

function CourseHorizontalCard(props) {
    return (
        <Card className="flex gap-3 cursor-pointer">
            <img src={props?.image} alt={props.title} className="w-1/3 rounded-tl-xl rounded-bl-xl" />
            <div>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription className="line-clamp-2" title={props.description}>{props.description}</CardDescription>
            </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    <p className="font-medium">Total Lectures : {props?.lecture}</p>
                    <span className="font-medium text-slate-700">
                Created By : {props?.author}
                </span>
                    <div className="uppercase flex gap-2">
                        <Chip label={props.level} variant="outlined"/>
                        <Chip label={props.category} variant="outlined"/>
                        <Chip label={props.language} variant="outlined"/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                <div className="flex gap-3">
                <span className="font-semibold">
                     $ {props?.disCountedPrice}
                </span>
                <span className="text-gray-600 line-through font-medium">
                    (${props?.pricing})
                </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                    Rating : 4.2
                    <StarIcon size={14} color={"orange"} fill={"darkorange"}/>
                </div>
            </CardFooter>
            </div>
        </Card>
    )
}
export default CourseHorizontalCard;
