import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardLoader = ({ cardCount = 4 }) => {
    return (
        <>
            {Array.from({ length: cardCount }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse bg-white shadow-md "
                >
                    {/* Image loader */}
                    <Skeleton className="h-40 rounded-t-md w-full" />

                    <div className="p-6">
                        {/* Title loader */}
                        <Skeleton className="h-5 rounded-md mt-4 w-3/4" />

                        {/* Subtitle loader */}
                        <Skeleton className="h-4 rounded-md mt-2 w-1/2" />

                        {/* Description loader */}
                        <Skeleton className="h-3 rounded-md mt-2 w-full" />
                        <Skeleton className="h-3 rounded-md mt-1 w-5/6" />

                        {/* Price loader */}
                        <Skeleton className="h-5 rounded-md mt-4 w-1/3" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonCardLoader;
