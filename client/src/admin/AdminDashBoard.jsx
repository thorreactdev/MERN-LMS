import {Card, CardContent, CardHeader, CardDescription, CardTitle} from "@/components/ui/card.jsx";
import { UsersIcon } from "@heroicons/react/24/outline";
function AdminDashBoard() {
    return (
        <Card className="bg-gradient-to-r from-purple-700 to-purple-500">
            <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg lg:text-xl">
                    Total Students
                </CardTitle>
                <UsersIcon className="w-7 h-7 text-white"/>
                </div>
                <CardDescription className="text-white">
                    Number of Student Registered on Website
                </CardDescription>
            </CardHeader>
            <CardContent className="text-white">
                90
            </CardContent>

        </Card>
    )
}
export default AdminDashBoard;