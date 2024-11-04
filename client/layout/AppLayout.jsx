import {Toaster} from "@/components/ui/toaster.jsx";
import Header from "@/components/Header.jsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"

const AppLayout = ({children}) => {
    return (
        <>
            <Toaster/>
            <header className="w-full">
                <Header/>
            </header>
                <main>
                    {children}
                </main>
            <footer></footer>
        </>
    )
}

export default AppLayout;