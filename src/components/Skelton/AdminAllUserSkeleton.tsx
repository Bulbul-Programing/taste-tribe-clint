import { Skeleton } from "@nextui-org/react";

const UsersPageSkeleton = () => {
  return (
    <div>
      <div className="overflow-x-auto mb-5 md:mb-7 lg:mb-5 border-2 rounded-xl">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
              <th className="px-2 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-2 py-3 text-left text-sm font-medium">
                User role
              </th>
              <th className="px-2 py-3 text-left text-sm font-medium">
                User Status
              </th>
              <th className="px-2 py-3 text-left text-sm font-medium" />
              <th className="px-2 py-3 text-center text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                </td>
                <td className="min-w-44 py-2 font-semibold">
                  <Skeleton className="w-32 h-5" />
                </td>
                <td className="min-w-32 px-2">
                  <Skeleton className="w-24 h-5" />
                </td>
                <td className="px-2 min-w-32">
                  <Skeleton className="w-28 h-5" />
                </td>
                <td className="px-2 min-w-32">
                  <Skeleton className="w-20 h-5" />
                </td>
                <td className="px-6 py-2 flex items-center justify-center space-x-4">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-5 h-5 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPageSkeleton;
