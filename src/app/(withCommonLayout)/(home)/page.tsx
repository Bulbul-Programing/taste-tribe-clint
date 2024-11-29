"use client";
import React from "react";

import Slider from "@/src/components/Home/Slider";
import RecentFiveRecipe from "@/src/components/Home/RecentFiveRecipe";

const page = () => {
  return (
    <div>
      <Slider />
      <RecentFiveRecipe />
    </div>
  );
};

export default page;
