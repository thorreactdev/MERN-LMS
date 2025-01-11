import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowsUpDownIcon} from "@heroicons/react/24/outline/index.js";
import {useEffect, useState} from "react";
import {sortOptions} from "@/data/importantData.js";
import {filterOptions} from "@/data/importantData.js";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {useStudent} from "@/context/StudentContext.jsx";
import CourseHorizontalCard from "@/components/CourseHorizontalCard.jsx";
import SkeletonHorizontalCard from "@/utils/SkeletonHorizontalCard.jsx";
import {Link, useSearchParams} from "react-router-dom";
import {useAuth} from "@/context/AuthContext.jsx";

function createSearchParamHelper(filterOptions) {
    let queryParams = [];
    for (const [key, value] of Object.entries(filterOptions)) {
        if (Array.isArray(value) && value.length > 0) {
            const params = value.join(",");
            console.log(params, "params");
            queryParams.push(`${key}=${encodeURIComponent(params)}`);
        }
    }
    return queryParams.join("&");
}

function CoursePage() {
    const [sort, setSort] = useState("price-lowtohigh");
    const [filters, setFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const {getStudentCourseList, studentCourseList, loading , checkCoursePurchased} = useStudent();
    const { user } = useAuth();

    async function handleFilterChange(getCurrentSection, getOptionID) {
        let copyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getCurrentSection);
        console.log(indexOfCurrentSection, getOptionID);
        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [getCurrentSection]: [getOptionID]
            }
        } else {
            const indexOfCurrentSection = copyFilters[getCurrentSection].indexOf(getOptionID);
            if (indexOfCurrentSection === -1) {
                copyFilters[getCurrentSection].push(getOptionID);
            } else {
                copyFilters[getCurrentSection].splice(indexOfCurrentSection, 1);
            }
        }
        setFilters(copyFilters);
        localStorage.setItem("filters", JSON.stringify(copyFilters));

    }
    async function handlePurchaseOrNot(getCourseId){
        await checkCoursePurchased(getCourseId , user?._id);
    }

    useEffect(() => {
        const buildQueryParams = createSearchParamHelper(filters);
        setSearchParams(new URLSearchParams(buildQueryParams));
    }, [filters]);

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(localStorage.getItem("filters")) || {});
    }, []);

    useEffect(() => {
        if (filters !== null && sort !== null) {
            getStudentCourseList(filters, sort);
        }
    }, [filters, sort]);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mt-5">
                All Courses
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4 sticky top-20 left-0 h-[calc(100vh-5rem)] overflow-auto">
                    <div className={"space-y-4"}>
                        {Object.keys(filterOptions)?.map(filterItem => (
                            <div className={"p-3"}>
                                <h3 className="font-bold mb-3">{filterItem.toUpperCase()}</h3>
                                <div className="grid gap-2 mt-2">
                                    {filterOptions[filterItem]?.map(item => (
                                        <Label className="flex gap-2 items-center font-medium">
                                            <Checkbox
                                                checked={
                                                    filters && Object.keys(filters).length > 0 && filters[filterItem] && filters[filterItem]?.indexOf(item?.id) > -1
                                                }
                                                onCheckedChange={() => handleFilterChange(filterItem, item?.id)}
                                            />
                                            {item?.label}
                                        </Label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                <main className="flex-1">
                    <div className="flex justify-end items-center mb-4 gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className="flex items-center gap-1" size="sm" variant="outline">
                                    <ArrowsUpDownIcon/> Sort By
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                                    {sortOptions.map((item) => (
                                        <DropdownMenuRadioItem value={item.id} key={item.id}>
                                            {item?.label}
                                        </DropdownMenuRadioItem>
                                    ))}

                                </DropdownMenuRadioGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-gray-800 font-semibold text-sm">{studentCourseList?.length} results</span>
                    </div>
                    <div className="p-3 grid grid-cols-1 gap-3">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-3">
                                <SkeletonHorizontalCard cardCount={studentCourseList?.length}/>
                            </div>
                        ) : (
                            studentCourseList && studentCourseList.length > 0 ? (
                                studentCourseList?.map(item => (
                                    <div key={item?._id} onClick={()=> handlePurchaseOrNot(item?._id)}>
                                    <CourseHorizontalCard
                                        title={item.courseTitle}
                                        image={item.image}
                                        pricing={item.pricing}
                                        description={item.description}
                                        level={item.level}
                                        category={item?.category}
                                        language={item?.primaryLanguage}
                                        author={item?.instructorName}
                                        lecture={item?.curriculum?.length}
                                        disCountedPrice={item?.disCountedPrice}
                                    />
                                    </div>
                                ))
                            ) : (
                                <p>No course Found</p>
                            )
                        )}
                    </div>

                </main>
            </div>

        </div>
    );
}

export default CoursePage;