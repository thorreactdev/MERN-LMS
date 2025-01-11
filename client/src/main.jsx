import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "@/context/AuthContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {AdminProvider} from "@/context/AdminContext.jsx";
import {StudentProvider} from "@/context/StudentContext.jsx";



createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <BrowserRouter>
            <AuthProvider>
            <AdminProvider>
                <StudentProvider>
                <App/>
                </StudentProvider>
            </AdminProvider>
            </AuthProvider>
        </BrowserRouter>
    // </StrictMode>,
)
