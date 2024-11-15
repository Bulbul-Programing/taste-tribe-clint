"use client";
import { Skeleton } from "@nextui-org/react";

const loading = () => {
  return (
    <div>
      <Skeleton className="w-16 h-16 rounded-full" />
    </div>
  );
};

export default loading;
