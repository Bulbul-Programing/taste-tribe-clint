"use client";
import React from "react";
import { toast } from "sonner";

const page = () => {
  return (
    <div>
      <button onClick={() => toast.success("succ")}>click me</button>
    </div>
  );
};

export default page;
