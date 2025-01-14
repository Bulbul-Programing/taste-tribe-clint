"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import TTForm from "../Form/TTForm";
import TTInput from "../Form/TTInput";

import UserSkeleton from "./UserSkeleton";

import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  useUpdateUserDataMutation,
  useUserInfoQuery,
} from "@/src/redux/Users/userManagementApi";
import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";
import { hostImages } from "@/src/utils/ImageUpload";

type TUpdateUserData = {
  name?: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  profilePicture?: string;
};
const UserProfileData = () => {
  const userToken = useAppSelector(useCurrentToken);
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const { data: userData, isLoading } = useUserInfoQuery(userInfo?.email);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true);
  const [isRequired, setIsRequired] = useState(false);
  const [updateUser] = useUpdateUserDataMutation();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File[] | []>([]);
  const [profilePreview, setProfilePreview] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");

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
    }
  }, [userToken]);

  const handleOnchange = (fieldName: string) => {
    if (fieldName === "name") {
      setSubmitButtonDisable(false);
    }

    if (
      fieldName === "currentPassword" ||
      fieldName === "newPassword" ||
      fieldName === "retypePassword"
    ) {
      setSubmitButtonDisable(false);
      setIsRequired(true);
    }
  };

  const handleUpdateProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setIsRequired(false);
    setSubmitButtonDisable(false);
    setProfilePhoto([file]);
    if (file) {
      setProfilePreview([]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    let updateData = {} as TUpdateUserData;

    if (data.currentPassword && data.newPassword && data.retypePassword) {
      if (
        data.currentPassword.length < 6 ||
        data.newPassword.length < 6 ||
        data.retypePassword.length < 6
      ) {
        setLoading(false);

        return toast.error("Passwords should be at least 6 characters long.");
      }
      if (data.newPassword !== data.retypePassword) {
        setLoading(false);

        return toast.error("Passwords do not match.");
      }
      updateData.newPassword = data.newPassword;
      updateData.currentPassword = data.currentPassword;
    }
    if (data.name !== userData?.data?.name) {
      updateData.name = data.name;
    }
    if (profilePhoto.length > 0) {
      const uploadPhoto = await hostImages(profilePhoto);

      updateData.profilePicture = uploadPhoto[0];
    }

    updateData.email = userData?.data?.email;
    try {
      const res = (await updateUser(updateData)) as any;

      if (res?.data?.data?.modifiedCount > 0) {
        setLoading(false);
        toast.success("User data updated successfully.");
        setSubmitButtonDisable(true);
        setCurrentPass("");
        setNewPass("");
        setRetypePass("");
        setIsRequired(false);
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
    return <UserSkeleton />;
  }

  return (
    <div>
      {/* <h1 className="text-xl font-medium text-center">Welcome back <span className="text-2xl">{data?.data?.name}</span></h1> */}
      <div className="bg-gradient-to-r from-[#1BEEA2]/50 to-blue-500/30 py-10 md:py-10 lg:py-16 rounded-tl-[60px]" />
      <div className="flex flex-col md:flex-row lg:flex-row justify-center md:justify-start lg:justify-start items-center mt-[-30px] mx-10">
        <div className="relative group">
          <img
            alt=""
            className="w-[150px] border-[5px] border-white shadow-2xl h-[150px] rounded-full"
            src={
              profilePreview.length > 0
                ? profilePreview[0]
                : userData?.data?.profilePicture
            }
          />
          <label
            className="absolute inset-0 transition-all ease-out flex items-center group-hover:opacity-100 opacity-0 justify-center bg-black bg-opacity-40 cursor-pointer rounded-full"
            htmlFor="profilePicture"
          >
            <IoCameraOutline className="text-3xl text-white font-bold" />
          </label>
          <input
            accept="image/jpeg, image/png"
            className="hidden"
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={handleUpdateProfilePicture}
          />
        </div>
        <div className=" ml-0 md:ml-7 lg:ml-7 my-3 md:my-0 lg:my-0">
          <h1 className="text-2xl text-center md:text-left lg:text-left font-semibold">
            {userData?.data?.name}
          </h1>
          <div className="flex gap-x-3 mt-2">
            <p className="text-sm border rounded-md hover:text-black hover:bg-[#1BEEA2] border-[#1BEEA2] transition-all ease-in px-1">
              <span className=" text-lg">
                {userData?.data?.followers.length}
              </span>{" "}
              Followers
            </p>
            <p className="text-sm border rounded-md hover:text-black hover:bg-[#1BEEA2] border-[#1BEEA2] transition-all ease-in px-1">
              <span className=" text-lg">
                {userData?.data?.following.length}
              </span>{" "}
              Following
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-5 bg-white rounded-lg ">
        <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
        <TTForm onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-3">
            <TTInput
              defaultValue={userData?.data?.name}
              label="Name"
              name="name"
              required={false}
              onChange={() => handleOnchange("name")}
            />
            <TTInput
              disabled
              defaultValue={userData?.data?.email}
              label="Email"
              name="email"
            />
            <TTInput
              disabled
              defaultValue={userData?.data?.phoneNumber}
              label="Phone Number"
              name="phone"
            />
            <TTInput
              defaultValue={currentPass}
              label="Current Password"
              name="currentPassword"
              required={isRequired}
              type="password"
              onChange={() => handleOnchange("currentPassword")}
            />
            <TTInput
              defaultValue={newPass}
              label="New Password"
              name="newPassword"
              required={isRequired}
              type="password"
              onChange={() => handleOnchange("newPassword")}
            />
            <TTInput
              defaultValue={retypePass}
              label="Retype Password"
              name="retypePassword"
              required={isRequired}
              type="password"
              onChange={() => handleOnchange("retypePassword")}
            />
          </div>
          <Button
            className={`w-full ${submitButtonDisable ? "bg-slate-300 text-slate-700 cursor-not-allowed" : "bg-[#1BEEA2]"} font-semibold `}
            disabled={submitButtonDisable}
            isLoading={loading}
            type="submit"
          >
            Submit
          </Button>
        </TTForm>
      </div>
    </div>
  );
};

export default UserProfileData;
