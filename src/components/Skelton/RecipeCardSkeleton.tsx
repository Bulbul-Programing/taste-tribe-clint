const RecipeCardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative animate-pulse border border-gray-200 rounded-lg shadow-md overflow-hidden transform"
        >
          {/* Skeleton for Recipe Image */}
          <div className="h-48 bg-gray-200" />

          {/* Skeleton for Recipe Details */}
          <div className="p-4">
            <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-3" />{" "}
            {/* Title */}
            <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2" />{" "}
            {/* Category */}
            <div className="h-4 bg-gray-200 rounded-md w-1/4" />{" "}
            {/* Cooking Time */}
          </div>

          {/* Skeleton for Floating Badge */}
          <span className="absolute top-2 right-2 bg-gray-300 rounded-full w-12 h-6" />
        </div>
      ))}
    </div>
  );
};

export default RecipeCardSkeleton;
