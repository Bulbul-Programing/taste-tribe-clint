"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import FollowingSkeleton from "../Skelton/FollowingSkeleton";

import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  useGetAllFollowingQuery,
  useRemoveFollowerMutation,
} from "@/src/redux/Users/userManagementApi";
import { TDecodedUser, TUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";

const Following = () => {
  const { data, isLoading } = useGetAllFollowingQuery(undefined);
  const userToken = useAppSelector(useCurrentToken);
  const [decodedUser, setDecodedUser] = useState<TDecodedUser | any>({});
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [removeFollower] = useRemoveFollowerMutation();

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken);

      if (decodedToken) {
        setDecodedUser(decodedToken);
      } else {
        dispatch(logout());
        router.push("/login");
      }
    } else {
      setDecodedUser({});
    }
  }, [userToken]);

  const handleUnFollow = async (followingId: string) => {
    const followerData = {
      userId: decodedUser.id,
      followerId: followingId,
    };

    try {
      setLoading(true);
      const res = (await removeFollower(followerData)) as any;

      if (res?.data?.data?.modifiedCount > 0) {
        setLoading(false);
        toast.success(res.data.massage || "User UnFollowed successfully.");
      } else if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message || "An error occurred");
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An error occurred while updating user data.");
      setLoading(false);
    }
  };

  if (isLoading) {
    return <FollowingSkeleton />;
  }

  return (
    <div className="flex gap-x-3 my-3 flex-wrap">
      {data?.data?.length > 0 ? (
        data?.data?.map((user: TUser) => (
          <div
            key={user._id}
            className="flex flex-wrap border p-2 gap-x-3 items-center rounded transition-all hover:bg-slate-100"
          >
            <img
              alt={user.name}
              className="w-14 h-14 object-cover rounded-full border shadow-md"
              src={user.profilePicture}
            />
            <div>
              <p>
                Name: <span className=" font-medium">{user.name}</span>
              </p>
              <p>
                Phone:{" "}
                <span className=" font-medium">
                  {user.phoneNumber.slice(0, 8)}***
                </span>
              </p>
            </div>
            <div>
              <Button
                className="bg-[#1BEEA2]"
                size="sm"
                onClick={() => handleUnFollow(user._id)}
              >
                Un follow
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full mb-4">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              You have no Following yet!
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Start following for gain followers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
