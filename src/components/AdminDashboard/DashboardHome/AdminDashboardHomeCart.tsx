"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

import { GetUserInfo } from "@/src/utils/getUserInfo";
import { useGetAllUserCountQuery } from "@/src/redux/Users/userManagementApi";
import { useGetTotalRecipeCountQuery } from "@/src/redux/Recipes/recipeManagementApi";

const AdminDashboardHomeCart = () => {
  const userInfo = GetUserInfo();
  const { data: totalUser, isLoading } = useGetAllUserCountQuery(undefined);
  const { data: totalRecipe } = useGetTotalRecipeCountQuery(undefined);
  const router = useRouter();

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="grid gap-x-3 grid-cols-4 my-5">
      <button
        className="bg-slate-100 cursor-pointer flex gap-x-6  items-center justify-between p-3 rounded-md"
        onClick={() => handleRoute(`/${userInfo.data.role}/followers`)}
      >
        <div>
          <p className="text-slate-600 text-left text-lg font-medium">Total </p>
          <p className="text-sm">
            <span className="text-xl font-semibold">
              {totalUser?.data ? totalUser?.data : 0}
            </span>
            {"  Users "}
          </p>
        </div>
        <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
          <FaUsers className="text-3xl" />
        </div>
      </button>
      <button
        className="bg-slate-100 cursor-pointer flex gap-x-6  items-center justify-between p-3 rounded-md"
        onClick={() => handleRoute(`/${userInfo.data.role}/recipe`)}
      >
        <div>
          <p className="text-slate-600 text-left text-lg font-medium">Total </p>
          <p className="text-sm">
            <span className="text-xl font-semibold">
              {totalRecipe?.data ? totalRecipe?.data : 0}
            </span>
            {"  Recipes "}
          </p>
        </div>
        <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
          <MdRestaurant className="text-3xl" />
        </div>
      </button>
    </div>
  );
};

export default AdminDashboardHomeCart;
