import { Skeleton } from "@/components/ui/skeleton";

function SkeletonHorizontalCard({ cardCount }) {
    return (
        <>
            {Array.from({ length : cardCount})?.map((_,index)=>(
        <div className="flex gap-3 cursor-pointer animate-pulse" key={index}>
            {/* Image Skeleton */}
            <Skeleton className="w-[40%] rounded-tl-xl rounded-bl-xl" />
            <div className="flex-1 flex flex-col justify-between">
                {/* Title and Description Skeleton */}
                <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                {/* Author and Chips Skeleton */}
                <div className="px-4 mb-4 space-y-2">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                </div>
                {/* Pricing and Rating Skeleton */}
                <div className="flex justify-between items-center px-4 pb-4">
                    <div className="flex gap-3">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                </div>
        </div>
            </div>
            ))}
        </>
    );
}

export default SkeletonHorizontalCard;
