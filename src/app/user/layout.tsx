"use client";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { SlUserFollowing } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";

import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";
import { verifyToken } from "@/src/utils/veryfyToken";
import { TDecodedUser } from "@/src/types/decodedUser";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import UserDashboardSkeleton from "@/src/components/Skelton/userDashboardSkeleton";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const { data, isLoading } = useUserInfoQuery(userInfo.email, {
    skip: !userInfo.email,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPage = usePathname();

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

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsExpanded(true);
  };

  const handleOutsideClick = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  if (isLoading) {
    return <UserDashboardSkeleton />;
  }

  const dashboardNavItem = [
    {
      path: "/user/dashboard",
      element: "Dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      path: "/user/profile",
      element: "Profile",
      icon: <FaRegUser />,
    },
    {
      path: "/user/recipe",
      element: "My Recipe",
      icon: <PiBowlFood />,
    },
    {
      path: "/user/followers",
      element: "Followers",
      icon: <SlUserFollowing />,
    },
    {
      path: "/user/following",
      element: "Following",
      icon: <HiOutlineUsers />,
    },
    {
      path: "/user/memberships",
      element: "Memberships",
      icon: <MdOutlineWorkspacePremium />,
    },
    {
      path: "/",
      element: "Home",
      icon: <IoHomeOutline />,
    },
  ];

  return (
    <div className="max-w-7xl relative mx-auto  flex flex-col md:flex-col lg:flex-row">
      <div className=" block md:block lg:hidden" onClick={handleDrawerToggle}>
        <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
          <IoMenu className="text-2xl text-black " />
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className=" absolute min-h-screen h-full inset-0 bg-black opacity-10 z-20"
          onClick={handleOutsideClick}
        />
      )}

      <div
        className={`min-h-screen h-full absolute lg:block bg-[#f1f2f7] text-black transition-all duration-300 ease-in-out transform ${
          isExpanded ? "w-48 block" : "w-16 hidden"
        } ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-30`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={` flex justify-center items-center pt-5  transition-all duration-300 ease-in-out transform`}
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
        <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
          {dashboardNavItem.map((item, index) => (
            <Link
              key={index}
              className={`flex gap-x-2  ${
                isExpanded ? "justify-start" : "justify-center"
              } items-center ${currentPage === item.path ? isExpanded && "bg-[#1BEEA2] rounded-lg" : ""} hover:bg-[#1BEEA2] p-2 m-2 hover:rounded-md`}
              href={item.path}
              onClick={() => setIsDrawerOpen(false)}
            >
              <div
                className={`text-lg md:text-2xl lg:text-xl ${currentPage === item.path ? !isExpanded && "bg-[#1BEEA2] p-3 rounded-full" : ""}`}
              >
                {item.icon}
              </div>
              <p
                className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"} transition-all duration-200 ease-in-out`}
              >
                {item.element}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className=" w-full lg:ml-16 px-3 md:px-4 lg:px-5 p-2 md:p-2 pt-5">
        {children}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
