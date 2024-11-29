import React from 'react';

const ShortSliderSkeleton = () => {
  return (
    <div className='mx-5 md:mx-5 lg:mx-10'>
      {/* Heading Skeleton */}
      <div className='flex justify-center'>
        <div className="h-12 w-72 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Main Skeleton Area */}
      <div className='my-10 flex flex-col md:flex-col lg:flex-row justify-between items-center gap-y-5 gap-x-2'>
        {/* Skeleton for Swiper */}
        <div className='w-full lg:w-4/6 border rounded-lg p-5 space-y-4'>
          {[...Array(1)].map((_, index) => (
            <div key={index} className='flex flex-col-reverse md:flex-row lg:flex-row items-center gap-y-5 md:gap-y-0 lg:gap-y-0'>
              {/* Skeleton for Text */}
              <div className="p-5 space-y-3 w-full md:w-2/5">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-11/12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-gray-300 rounded animate-pulse mt-3"></div>
                <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse mt-5"></div>
              </div>
              {/* Skeleton for Image */}
              <div className="h-64 w-full md:w-3/5 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Skeleton for Secondary Recipe List */}
        <div className='w-full lg:w-2/6 space-y-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='flex justify-start lg:justify-between items-center gap-x-2 border p-2 rounded-lg'>
              {/* Skeleton for Thumbnail */}
              <div className="h-24 w-36 bg-gray-300 rounded-lg animate-pulse"></div>
              {/* Skeleton for Text */}
              <div className='flex flex-col space-y-2 w-full'>
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-11/12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-5 w-20 bg-gray-300 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortSliderSkeleton;
