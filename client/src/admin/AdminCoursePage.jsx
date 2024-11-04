import {Card, CardContent, CardHeader, CardDescription, CardTitle} from "@/components/ui/card.jsx";
import { PlusCircleIcon , PencilSquareIcon , TrashIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.jsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Link} from "react-router-dom";
function AdminCoursePage() {
    return(
       <Card>
           <CardHeader className="flex justify-between flex-row items-center">
               <CardTitle className="text-lg lg:text-2xl font-bold">
                   All Courses
               </CardTitle>
               <Link to={"/create-new-course"}>
               <Button className="lg:p-6">
                   <PlusCircleIcon className="w-7 h-7 text-white "/> Create New Course
               </Button>
               </Link>
           </CardHeader>
           <CardContent>
               <div className="overflow-x-auto">
                   <Table className="text-xs lg:text-sm">
                       <TableCaption></TableCaption>
                       <TableHeader>
                           <TableRow>
                               <TableHead>Course</TableHead>
                               <TableHead>Student</TableHead>
                               <TableHead>Revenue</TableHead>
                               <TableHead className="text-right">Actions</TableHead>
                           </TableRow>
                       </TableHeader>
                       <TableBody>
                           <TableRow>
                               <TableCell className="font-medium">React JS Full Course 2025</TableCell>
                               <TableCell>100</TableCell>
                               <TableCell>$3400</TableCell>
                               <TableCell className="text-right">
                                   <Button variant="ghost" size="sm" title={"click To edit"}>
                                       <PencilSquareIcon className="mr-1"/>
                                   </Button><Button variant="ghost" size="sm" title={"Click To Delete"}>
                                      <TrashIcon/>
                                   </Button>
                               </TableCell>
                           </TableRow>
                       </TableBody>
                       <TableFooter>
                           <TableRow>
                               <TableCell colSpan={3}>Total</TableCell>
                               <TableCell className="text-right">$2,500.00</TableCell>
                           </TableRow>
                       </TableFooter>
                   </Table>

               </div>
           </CardContent>
       </Card>
    )
}
export default AdminCoursePage;
