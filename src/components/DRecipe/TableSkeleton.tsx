const TableSkeleton: React.FC = () => {
  const rows = 5; // Number of skeleton rows to display

  return (
    <div className="overflow-x-auto my-5 md:my-7 lg:my-10 border-2 rounded-xl">
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Cooking Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Category
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="border-b last:border-none">
              {/* Image Column */}
              <td className="px-6 py-4">
                <div className="w-14 h-14 bg-gray-300 rounded-lg animate-pulse" />
              </td>
              {/* Title Column */}
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse" />
              </td>
              {/* Cooking Time Column */}
              <td className="px-6 py-4">
                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
              </td>
              {/* Category Column */}
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
              </td>
              {/* Actions Column */}
              <td className="px-6 py-4 flex justify-center space-x-4">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
