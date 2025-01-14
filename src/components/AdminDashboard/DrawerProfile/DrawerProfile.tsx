import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import AdminProfileSkeleton from "../../Skelton/AdminProfileSkeleton";

import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";
import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";

const DrawerProfile = ({ isExpanded }: { isExpanded: boolean }) => {
  const userToken = useAppSelector(useCurrentToken);
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const { data, isLoading } = useUserInfoQuery(userInfo.email, {
    skip: !userInfo.email,
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  if (isLoading) {
    return <AdminProfileSkeleton isExpanded={isExpanded} />;
  }

  return (
    <div>
      <div
        className={` flex justify-center items-center pt-2  transition-all duration-300 ease-in-out transform`}
      >
        <img
          alt=""
          className={` rounded-full transition-all ease-in ${isExpanded ? "w-20 h-20" : "w-10 h-10"}`}
          src={data?.data?.profilePicture}
        />
      </div>
      <h1
        className={`${isExpanded ? "text-base mt-2" : "text-[0px] mt-0"} text-center transition-all ease-in duration-300 font-semibold`}
      >
        {data?.data?.name}
      </h1>
    </div>
  );
};

export default DrawerProfile;
