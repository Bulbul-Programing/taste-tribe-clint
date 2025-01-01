import React from "react";

const FollowingSkeleton = () => {
  return (
    <div className="flex gap-x-3 my-3 flex-wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-x-4 p-2 border rounded shadow-sm animate-pulse"
        >
          {/* Circle for profile picture */}
          <div className="w-14 h-14 bg-gray-300 rounded-full" />

          {/* Text placeholders */}
          <div className="flex flex-col gap-y-2">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-300 rounded" />
          </div>

          {/* Follow button */}
          <button className="w-20 h-8 text-xs bg-gray-300 text-white rounded-md">
            Un Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowingSkeleton;
