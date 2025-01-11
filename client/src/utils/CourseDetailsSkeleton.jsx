import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card.jsx";

function CourseDetailsSkeleton() {
    return (
        <div className=" p-4">
            <div className="rounded-md  p-8 text-white shadow-md flex items-center">
                <div className="flex-1">
                    <Skeleton className="h-8 w-3/4 mb-4"/>
                    <Skeleton className="h-4 w-5/6 mb-4"/>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                        <Skeleton className="h-4 w-1/4"/>
                        <Skeleton className="h-4 w-1/4"/>
                        <Skeleton className="h-4 w-1/6"/>
                        <Skeleton className="h-4 w-1/5"/>
                    </div>
                </div>
                <Skeleton className="h-40 w-[350px] rounded-md"/>
            </div>
            <div className="flex flex-col gap-8 md:flex-row mt-8">
                <main className="flex-grow">
                    <Card className="p-6 mb-8">
                        <Skeleton className="h-6 w-1/2 mb-4"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-11/12 mb-2"/>
                        <Skeleton className="h-4 w-3/4 mb-2"/>
                    </Card>
                    <Card className="p-6 mb-8">
                        <Skeleton className="h-6 w-1/2 mb-4"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-11/12 mb-2"/>
                        <Skeleton className="h-4 w-3/4 mb-2"/>
                    </Card><Card className="p-6 mb-8">
                        <Skeleton className="h-6 w-1/2 mb-4"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-11/12 mb-2"/>
                        <Skeleton className="h-4 w-3/4 mb-2"/>
                    </Card>


                </main>
                <aside className="w-full md:w-[500px]">
                    <Skeleton className="h-60 w-full rounded-md mb-4"/>
                    <Skeleton className="h-4 w-1/3 mb-2"/>
                    <Skeleton className="h-4 w-1/2"/>
                    <Card className="p-5 mt-8">
                    {/*<Skeleton className="h-60 w-full rounded-md mb-4"/>*/}
                    <Skeleton className="h-4 w-1/3 mb-2"/>
                    <Skeleton className="h-4 w-1/2"/>

                    </Card>
                </aside>
            </div>
        </div>
    );
}

export default CourseDetailsSkeleton;
