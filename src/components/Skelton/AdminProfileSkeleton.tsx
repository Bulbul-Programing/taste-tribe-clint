import { Skeleton } from "@nextui-org/react";

const AdminProfileSkeleton = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div
      className={`flex justify-center items-center pt-2 transition-all duration-300 ease-in-out transform`}
    >
      <Skeleton
        className={`rounded-full ${isExpanded ? "w-20 h-20" : "w-10 h-10"}`}
      />
      <Skeleton
        className={`${isExpanded ? "h-5 mt-2 w-24" : "h-0 mt-0 w-0"} rounded`}
      />
    </div>
  );
};

export default AdminProfileSkeleton;
