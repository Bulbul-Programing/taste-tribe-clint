"use client";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { SlUserFollowing } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { verifyToken } from "@/src/utils/veryfyToken";
import { TDecodedUser } from "@/src/types/decodedUser";
import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useCountUserAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";

const UserDashboard = () => {
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const { data, isLoading } = useUserInfoQuery(userInfo.email, {
    skip: !userInfo.email,
  });
  const { data: userRecipes, isLoading: userRecipesLoading } =
    useCountUserAllRecipesQuery(undefined);
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken);

      if (decodedToken) {
        setUserInfo(decodedToken);
      } else {
        dispatch(logout());
        router.push("/login");
      }
    } else {
      setUserInfo({});
      dispatch(logout());
    }
  }, [userToken]);

  const handleRoute = (link: string) => {
    router.push(link);
  };

  return (
    <div className="py-5 pr-5">
      <div className="flex justify-between items-center shadow-xl p-5 rounded-lg">
        <h1 className="text-2xl font-bold ">Welcome back {data?.data?.name}</h1>
      </div>
      <div className="grid grid-cols-4 gap-x-5 my-7">
        <div
          className="bg-slate-100 cursor-pointer flex items-center justify-between p-3 rounded-md"
          onClick={() => handleRoute(`/${userInfo.role}/follower`)}
        >
          <div>
            <p className="text-slate-600 text-sm font-medium">Your total </p>
            <p className="text-sm">
              <span className="text-xl font-semibold">
                {data?.data?.followers ? data?.data?.followers.length : 0}
              </span>{" "}
              followers
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
            <SlUserFollowing className="text-4xl" />
          </div>
        </div>
        <div
          className="bg-slate-100 cursor-pointer flex items-center justify-between p-3 rounded-md"
          onClick={() => handleRoute(`/${userInfo.role}/following`)}
        >
          <div>
            <p className="text-slate-600 text-sm font-medium">Your total </p>
            <p className="text-sm">
              <span className="text-xl font-semibold">
                {data?.data?.following ? data?.data?.following.length : 0}
              </span>{" "}
              Following
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
            <FaUsers className="text-4xl" />
          </div>
        </div>
        <div
          className="bg-slate-100 flex items-center cursor-pointer justify-between p-3 rounded-md"
          onClick={() => handleRoute(`/${userInfo.role}/recipe`)}
        >
          <div>
            <p className="text-slate-600 text-sm font-medium">Your share </p>
            <p className="text-sm">
              <span className="text-xl font-semibold">
                {userRecipes?.data ? userRecipes?.data : 0}
              </span>{" "}
              recipe{" "}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
            <RiBloggerLine className="text-4xl" />
          </div>
        </div>
        <div
          className="bg-slate-100 cursor-pointer flex items-center justify-between p-3 rounded-md"
          onClick={() => handleRoute(`/${userInfo.role}/memberships`)}
        >
          <div>
            <p className="text-slate-600 text-sm font-medium">Your Status </p>
            <p className="text-sm">
              <span className="text-xl font-semibold">
                {data?.data?.premiumStatus === true ? "Premium" : "Basic"}
              </span>{" "}
              User
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
            {data?.data?.premiumStatus === true ? (
              <MdOutlineWorkspacePremium className="text-4xl" />
            ) : (
              <FaUser className="text-4xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
