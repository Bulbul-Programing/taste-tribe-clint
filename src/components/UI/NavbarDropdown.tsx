import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";

const NavbarDropdown = () => {
  const router = useRouter();
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useUserInfoQuery(userInfo.email, {
    skip: !userInfo.email,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken) as TDecodedUser;
      if (decodedToken.exp <= Date.now() / 1000) {
        dispatch(logout());
      }
      if (decodedToken) {
        setUserInfo(decodedToken);
      }
    } else {
      setUserInfo({});
    }
  }, [userToken]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  };
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if the clicked element is outside of dropdownRef
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Bind the event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <Skeleton className="w-12 h-12 rounded-full" />;
  }

  return (
    <div>
      {userInfo && userInfo?.email ? (
        <div ref={dropdownRef} className="relative inline-block text-left">
          <button className="cursor-pointer" onClick={toggleDropdown}>
            <Image
              alt=""
              className="w-14 h-14 rounded-full border-2 p-[1px] border-white"
              height={80}
              src={
                userInfo.profilePicture ||
                "https://i.pravatar.cc/150?u=a04258114e29026302d"
              }
              width={80}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-2 text-black">
                  <img
                    alt=""
                    className="w-16 h-16 mb-1 rounded-full mx-auto"
                    src={data?.data?.profilePicture}
                  />
                  <h1 className="text-lg font-medium text-center ">
                    {data?.data?.name}
                  </h1>
                  <div className="flex justify-between gap-x-1 items-center mt-1">
                    <p className="text-sm border rounded-md hover:text-black hover:bg-[#1BEEA2] border-[#1BEEA2] transition-all ease-in px-1">
                      <span className=" text-lg">
                        {data?.data?.followers.length}
                      </span>{" "}
                      Followers
                    </p>
                    <p className="text-sm border rounded-md hover:text-black hover:bg-[#1BEEA2] border-[#1BEEA2] transition-all ease-in px-1">
                      <span className=" text-lg">
                        {data?.data?.following.length}
                      </span>{" "}
                      Following
                    </p>
                  </div>
                </div>
                <button className=" px-4 py-2 flex flex-col text-sm text-gray-700 w-full text-left">
                  <Link
                    className="mt-2 border w-full p-2 hover:bg-[#1BEEA2] transition-all ease-in rounded-md "
                    href={`${userInfo?.role}/profile`}
                  >
                    Profile
                  </Link>
                  <Link
                    className="mt-2 border w-full p-2 hover:bg-[#1BEEA2] transition-all ease-in rounded-md "
                    href={`${userInfo?.role}/dashboard`}
                  >
                    Dashboard
                  </Link>
                </button>
                <button
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleLogout()}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          className="px-4 py-2 rounded-md bg-[#1BEEA2] text-black font-medium"
          href="/login"
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default NavbarDropdown;
