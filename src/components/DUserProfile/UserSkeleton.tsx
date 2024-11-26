import { Card, Skeleton, Button } from "@nextui-org/react";

export default function UserSkeleton() {
    return (
        <div>
            <div className="bg-gradient-to-r from-[#1BEEA2]/50 to-blue-500/30 py-10 md:py-10 lg:py-16 rounded-tl-[60px]"></div>
            <div className="flex flex-col md:flex-row lg:flex-row justify-center md:justify-start lg:justify-start items-center mt-[-30px] mx-10">
                {/* Profile Image Skeleton */}
                <div className="relative">
                    <Skeleton className="rounded-full w-[150px] h-[150px] border-[5px] border-white shadow-2xl" />
                </div>

                {/* User Info Skeleton */}
                <div className="ml-0 md:ml-7 lg:ml-7 my-3 md:my-0 lg:my-0">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <div className="flex gap-x-3 mt-2">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <Card className="max-w-3xl mx-auto mt-5 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-semibold mb-4">Update Your Profile</h1>
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-3">
                    {Array(6)
                        .fill("")
                        .map((_, idx) => (
                            <Skeleton key={idx} className="h-10 rounded-md mb-3" />
                        ))}
                </div>
                <Button disabled className="w-full bg-slate-300 text-slate-700 mt-4">
                    <Skeleton className="h-10 w-full" />
                </Button>
            </Card>
        </div>
    );
}
