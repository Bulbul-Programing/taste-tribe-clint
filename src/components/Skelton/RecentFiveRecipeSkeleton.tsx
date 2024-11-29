import { Skeleton } from "@nextui-org/react";

const RecentFiveRecipeSkeleton = () => {
    return (
        <div className="mx-3 md:mx-8 lg:mx-20 my-10">
            {/* Section Title Skeleton */}
            <div className="flex justify-center mb-8">
                <Skeleton className="h-12 w-48 rounded-lg" />
            </div>

            {/* First Row Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center gap-4 px-4">
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-3 shadow-xl rounded-lg"
                    >
                        <Skeleton className="w-full h-[300px] rounded-md mb-4" />
                        <div className="text-center">
                            <Skeleton className="h-6 w-24 mx-auto rounded-md mb-2" />
                            <Skeleton className="h-8 w-full rounded-md" />
                            <Skeleton className="h-4 w-16 mx-auto mt-2 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Second Row Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center gap-4 px-4">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-3 shadow-xl rounded-lg"
                    >
                        <Skeleton className="w-full h-[300px] rounded-md mb-4" />
                        <div className="text-center">
                            <Skeleton className="h-6 w-24 mx-auto rounded-md mb-2" />
                            <Skeleton className="h-8 w-full rounded-md" />
                            <Skeleton className="h-4 w-16 mx-auto mt-2 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentFiveRecipeSkeleton;
