"use client";
import React from "react";

import Slider from "@/src/components/Home/Slider";
import RecentFiveRecipe from "@/src/components/Home/RecentFiveRecipe";
import ShortSlider from "@/src/components/Home/ShortSlider";

const page = () => {
  return (
    <div>
      <Slider />
      <RecentFiveRecipe />
      <ShortSlider />
    </div>
  );
};

export default page;
