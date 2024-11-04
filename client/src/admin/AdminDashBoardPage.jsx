
import { ChartBarSquareIcon,BookOpenIcon,ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import AdminDashBoard from "@/admin/AdminDashBoard.jsx";
import AdminCoursePage from "@/admin/AdminCoursePage.jsx";
import {useState} from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {Button} from "@/components/ui/button.jsx";


function AdminDashBoardPage() {
    const[activeTab , setActiveTab] = useState("Dashboard");
    // Menu items.
    const menuItems = [
        {
            id:1,
            label: "Dashboard",
            value : "Dashboard",
            icon: <ChartBarSquareIcon className="h-6 w-6 mr-1"/>,
            component : <AdminDashBoard/>
        },
        {
            id:2,
            label: "Courses",
            value : "Courses",
            icon: <BookOpenIcon className="h-6 w-6 mr-1"/>,
            component: <AdminCoursePage/>
        },{
            id:3,
            label: "Logout",
            value : "Logout",
            icon: <ArrowLeftStartOnRectangleIcon className="h-6 w-6 mr-1"/>,
        }
    ]
    return (
        <div className="flex h-full min-h-screen">
            <aside className="hidden lg:block bg-sidebar w-[16rem] text-sidebar-foreground px-3 py-4 cursor-pointer">
                <div className="flex flex-col gap-4">
                <h2 className="text-sidebar-foreground text-lg font-medium p-3">Admin View</h2>
                 <nav className="">
                     {menuItems?.map((item)=>(
                         <Button
                             key={item?.id}
                             variant={activeTab === item?.value ? "secondary" : "ghost"}
                              className="w-full justify-start mb-4"
                             onClick={item?.value === "Logout" ? ()=> console.log("Logout") : ()=> setActiveTab(item?.value)}
                         >
                             {item?.icon}{item?.label}
                         </Button>
                     ))}
                 </nav>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-semibold mb-8 text-3xl">Admin Dashboard</h2>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        {menuItems?.map((item)=>(
                            <TabsContent value={item?.value} key={item?.id}>
                                {item?.component !== null ? item?.component : null}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
export default AdminDashBoardPage;