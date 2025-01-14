import React from "react";

const UserDashboardSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto max-w-7xl flex-grow">
      {/* Top Navigation Skeleton */}
      <div className="block md:block lg:hidden">
        <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
          <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div
        className={`absolute top-0 left-0 h-screen lg:block bg-gray-100 text-black transition-all duration-300 ease-in-out transform w-16 z-30`}
      >
        {/* Profile Picture Skeleton */}
        <div className="flex justify-center items-center mt-5">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <h1 className="text-center text-base mt-2 font-semibold bg-gray-300 h-5 w-12 mx-auto rounded animate-pulse">
          .
        </h1>

        {/* Navigation Items Skeleton */}
        <div className="mt-4 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-x-2 justify-start items-center bg-gray-200 hover:bg-gray-300 p-2 m-2 rounded-md animate-pulse"
            >
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      {/* <div className="m-3 lg:ml-20">
        <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg animate-pulse" />
        <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg animate-pulse" />
      </div> */}
    </div>
  );
};

export default UserDashboardSkeleton;
