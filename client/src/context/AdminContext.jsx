import React, {createContext, useContext, useState} from "react";
import {courseCurriculumInitialFormData} from "@/data/initialFormData.js";

export const AdminContext = createContext(null);
export const AdminProvider = ({ children }) => {
    const[courseCurriculum , setCourseCurriculum] = useState(courseCurriculumInitialFormData);
    return (
        <AdminContext.Provider value={{
            setCourseCurriculum,
            courseCurriculum
        }}>
            {children}
        </AdminContext.Provider>
    )
};
export const useAdmin = () => useContext(AdminContext);